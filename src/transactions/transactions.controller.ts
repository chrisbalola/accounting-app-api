import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserAuthGuard } from '../auth/user-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindTransactionsDto } from './dto/find-transactions.dto';
import { Transaction } from './models/transaction.model';
import { Transactions } from './models/transactions.model';
import { E_TRANSACTION_NOT_FOUND, E_UNAUTHORIZED_ACCESS_TO_RESOURCE } from '../common/exceptions';

@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@ApiTags('transactions')
@ApiUnauthorizedResponse()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOkResponse({ type: Transaction })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateTransactionDto })
  create(@Body() dto: CreateTransactionDto, @CurrentUser() currentUser) {
    return this.transactionsService.create(dto, currentUser);
  }

  @Get()
  @ApiOkResponse({ type: Transactions })
  findAll(@Query() dto: FindTransactionsDto, @CurrentUser() currentUser) {
    return this.transactionsService.findAll(dto, currentUser);
  }

  @Get(':id')
  @ApiOkResponse({ type: Transaction })
  @ApiNotFoundResponse({ description: E_TRANSACTION_NOT_FOUND })
  @ApiUnauthorizedResponse({ description: E_UNAUTHORIZED_ACCESS_TO_RESOURCE })
  findOne(@Param('id') id: number, @CurrentUser() currentUser) {
    return this.transactionsService.findOne(id, currentUser);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Transaction })
  @ApiNotFoundResponse({ description: E_TRANSACTION_NOT_FOUND })
  @ApiUnauthorizedResponse({ description: E_UNAUTHORIZED_ACCESS_TO_RESOURCE })
  @ApiBadRequestResponse()
  update(@Param('id') id: number, @Body() dto: UpdateTransactionDto, @CurrentUser() currentUser) {
    return this.transactionsService.update(id, dto, currentUser);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Transaction })
  @ApiNotFoundResponse({ description: E_TRANSACTION_NOT_FOUND })
  @ApiUnauthorizedResponse({ description: E_UNAUTHORIZED_ACCESS_TO_RESOURCE })
  remove(@Param('id') id: number, @CurrentUser() currentUser) {
    return this.transactionsService.remove(id, currentUser);
  }
}
