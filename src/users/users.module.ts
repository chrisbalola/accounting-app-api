import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [
    UsersController,
    AccountController
  ],
  providers: [
    UsersService,
  ],
  exports: [
    TypeOrmModule,
    UsersService,
  ]
})
export class UsersModule {}
