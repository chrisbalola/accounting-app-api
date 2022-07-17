import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { ResultsMetadata } from '../../common/models/results-metadata.model';

export class Users {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty()
  meta: ResultsMetadata;
}
