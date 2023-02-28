import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
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
