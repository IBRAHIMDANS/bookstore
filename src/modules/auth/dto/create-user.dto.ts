import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString({ message: 'FirstName must be a string' })
  @Length(3, 20, { message: 'FirstName must be between 3 and 20 characters' })
  @ApiProperty({ required: true, description: "User's firstName" })
  firstName: string;

  @IsString({ message: 'LastName must be a string' })
  @ApiProperty({ required: true, description: "User's lastName" })
  @Length(3, 20, { message: 'FirstName must be between 3 and 20 characters' })
  lastName: string;

  @IsEnum(['ADMIN', 'USER'], { message: 'Role must be ADMIN or USER' })
  @IsOptional()
  @ApiProperty({ required: true, description: "User's role" })
  role?: any;

  @IsBoolean({ message: 'isActive must be a boolean' })
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "User's isActive",
    default: true,
  })
  isActive?: boolean;

  @IsBoolean({ message: 'isEmailVerified must be a boolean' })
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "User's isEmailVerified",
    default: false,
  })
  isEmailVerified?: boolean;
}
