import { IsInt, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDTO {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @Length(3, 200)
  title: string;

  @IsString()
  @Length(3, 65)
  author: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  plublicationYear?: number;

  @IsString()
  @IsOptional()
  @Length(3, 65)
  genre: string;
}
