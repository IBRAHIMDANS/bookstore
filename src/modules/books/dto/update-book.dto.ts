import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { transformArray } from '@/utils';
import { CreateAuthorDto } from '@/modules/authors/dto/create-author.dto';
import { CreateGenreDto } from '@/modules/genres/dto/create-genre.dto';
import { CreateBookDto } from '@/modules/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsBoolean()
  @IsOptional()
  verified: boolean;
}
