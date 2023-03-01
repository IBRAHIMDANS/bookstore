import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  note: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  bookId: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  userId: string;
}
