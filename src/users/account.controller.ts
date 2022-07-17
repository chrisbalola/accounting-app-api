import {
  Controller,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards, Get, Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBasicAuth,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './models/user.model';
import { E_PASSWORD_INCORRECT } from '../common/exceptions';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserAuthGuard } from '../auth/user-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(UserAuthGuard)
@ApiTags('account')
@ApiBasicAuth()
@Controller('account')
export class AccountController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOkResponse({ type: User })
  findOne(@CurrentUser() currentUser) : Promise<User> {
    return this.usersService.findOne(currentUser.id);
  }

  @Patch('update-profile')
  @ApiOkResponse({ type: User })
  update(@Body() dto: UpdateUserDto, @CurrentUser() currentUser) {
    return this.usersService.update(currentUser.id, dto);
  }

  @Patch('update-password')
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: E_PASSWORD_INCORRECT })
  updatePassword(
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
    @CurrentUser() currentUser
  ) {
    return this.usersService.updatePassword(currentPassword, newPassword, currentUser);
  }

  @Delete()
  @ApiOkResponse()
  async remove(@Body('password') password, @CurrentUser() currentUser) {
    await this.usersService.verifyPassword(currentUser.id, password);
    return this.usersService.remove(+currentUser.id);
  }
}
