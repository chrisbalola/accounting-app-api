import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from './transaction.model';
import { ResultsMetadata } from '../../common/models/results-metadata.model';

export class Transactions {
  @ApiProperty({ type: [Transaction] })
  data: Transaction[];

  @ApiProperty()
  meta: ResultsMetadata;
}
