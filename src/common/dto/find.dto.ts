import { IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true, default: 12, description: "To get all results, put 0." })
  limit?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: 0 })
  offset?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true, default: 'createdAt' })
  sortField?: string;

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiProperty({ required: false, nullable: true, enum: ['asc', 'desc'], default: 'desc' })
  sortOrder?: string;
}
