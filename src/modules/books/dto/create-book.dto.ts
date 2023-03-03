import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { transformArray } from '@/utils';
import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateGenreDto } from '@/modules/genres/dto/create-genre.dto';

export class CreateBookDto {
  @ApiProperty({ required: false, description: "Book's id (optional)" })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    required: true,
    description: "Book's title",
    default: 'The Lord of the Rings',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  title: string;

  @ApiProperty({
    required: false,
    description: "Book's publication year (optional)",
    default: 2023,
  })
  @IsNumber()
  publicationYear: number;

  @ApiProperty({ required: false, description: "Book's language (optional)" })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiProperty({ required: false, description: "Book's color (optional)" })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    required: false,
    description: "Book's description (optional)",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, description: "Book's price (optional)" })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true, description: "Book's authors" })
  // @Transform(transformArray)
  @ValidateNested({ each: true })
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateAuthorDto)
  authors: CreateAuthorDto[];

  @ApiProperty()
  @Transform(transformArray)
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  genres: string[];
}
