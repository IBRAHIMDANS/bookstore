import { IsString, Length } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @Length(3, 200)
  title: string;

  @IsString()
  @Length(3, 65)
  author: string;
};
