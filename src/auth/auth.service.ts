import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { E_INCORRECT_EMAIL_OR_PASSWORD } from '../common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  getAccessToken (user: User) : string {
    return this.jwtService.sign({ sub: user.id, username: user.email });
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      accessToken: this.getAccessToken(user),
      user
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByField(loginDto.email, 'email');
    if (!user) throw new NotAcceptableException(E_INCORRECT_EMAIL_OR_PASSWORD);

    // Check password
    const bcrypt = require('bcrypt');
    if (!(await bcrypt.compare(loginDto.password, user.password))) throw new NotAcceptableException(E_INCORRECT_EMAIL_OR_PASSWORD);

    // Return the user and the access token
    return {
      accessToken: this.getAccessToken(user),
      user
    };
  }

}
