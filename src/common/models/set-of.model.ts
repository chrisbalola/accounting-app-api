import { ApiProperty } from '@nestjs/swagger';
import { ResultsMetadata } from './results-metadata.model';

export class SetOf<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  meta: ResultsMetadata;
}
