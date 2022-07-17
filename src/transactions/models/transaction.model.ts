import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { TransactionCategoryEnum } from '../enums/transaction-category.enum';

export class Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: Object.values(TransactionCategoryEnum)})
  type: TransactionTypeEnum;

  @ApiProperty({ enum: Object.values(TransactionCategoryEnum)})
  category: TransactionCategoryEnum;

  @ApiProperty()
  amount: number;

  @ApiProperty({ nullable: true })
  reason: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  userId: number;
}
