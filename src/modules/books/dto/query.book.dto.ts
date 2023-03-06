import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum SortingMethod {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type SortingMethodType = keyof typeof SortingMethod;

export class QueryBookDto {
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  page = 1;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit = 10;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  language?: string;

  @ApiProperty({ required: false, enum: SortingMethod })
  @IsOptional()
  @IsEnum(SortingMethod)
  @MaxLength(100)
  sortingMethod?: SortingMethod;
}
