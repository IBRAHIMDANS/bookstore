import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;
}
