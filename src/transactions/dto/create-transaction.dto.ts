import { IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategoryEnum } from '../enums/transaction-category.enum';

export class CreateTransactionDto {
  @IsEnum(TransactionCategoryEnum)
  @ApiProperty({ enum: Object.values(TransactionCategoryEnum) })
  readonly category: TransactionCategoryEnum;

  @IsNumber()
  @ApiProperty()
  readonly amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  readonly reason: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ nullable: true, description: "Transaction date and time. Defaults to now (When value is null or undefined)." })
  readonly date: Date;
}
