import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { User } from '@prisma/client';

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

  @IsString({ message: 'username must be a string' })
  @Length(3, 255)
  @IsLowercase()
  @IsAlphanumeric()
  @IsNotEmpty({ message: 'username is required' })
  @ApiProperty({ required: true, description: "User's username" })
  username: string;
}
