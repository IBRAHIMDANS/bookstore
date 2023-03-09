import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  fullName?: string;
}
