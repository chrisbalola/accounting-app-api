import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TransactionsModule
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
