import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  readonly password: string;
}
