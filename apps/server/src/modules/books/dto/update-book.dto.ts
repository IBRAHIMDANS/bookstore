import { IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from '@/modules/books/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsBoolean()
  @IsOptional()
  verified: boolean;
}
