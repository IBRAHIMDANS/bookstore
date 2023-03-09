import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @IsString({ message: 'Email must be a string' })
  @ApiProperty({ required: true, description: "User's email" })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @ApiProperty({ required: true, description: "User's password" })
  password: string;
}
