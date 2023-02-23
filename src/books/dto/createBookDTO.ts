import { IsInt, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDTO {
  @ApiProperty({ required: false, description: "Book's id (optional)" })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    required: true,
    description: "Book's title",
    default: "The Lord of the Rings",
  })
  @IsString()
  @Length(3, 200)
  title: string;

  @ApiProperty({
    required: true,
    description: "Book's author",
    default: "J.R.R. Tolkien",
  })
  @IsString()
  @Length(3, 65)
  author: string;

  @ApiProperty({
    required: false,
    description: "Book's publication year (optional)",
    default: 2023,
  })
  @IsNumber()
  @IsOptional()
  @IsInt()
  plublicationYear?: number;

  @ApiProperty({ required: false, description: "Book's genre (optional)" })
  @IsString()
  @IsOptional()
  @Length(3, 65)
  genre: string;
}
