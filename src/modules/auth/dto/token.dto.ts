import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  expiresIn: string;

  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  accessToken: string;

  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  firstName: string;

  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  lastName: string;

  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  email: string;

  @IsBoolean({ message: 'Token must be a boolean' })
  @ApiProperty({ required: true, description: "User's token" })
  isActive: boolean;

  @IsString({ message: 'Token must be a string' })
  @ApiProperty({ required: true, description: "User's token" })
  id: string;
}
