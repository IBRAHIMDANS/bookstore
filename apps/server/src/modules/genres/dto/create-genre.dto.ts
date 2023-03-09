import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  name: string;
}
