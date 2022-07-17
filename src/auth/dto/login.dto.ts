import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
