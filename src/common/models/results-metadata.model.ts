import { ApiProperty } from '@nestjs/swagger';

export class ResultsMetadata {
  @ApiProperty()
  total: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;
}
