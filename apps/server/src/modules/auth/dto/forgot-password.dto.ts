import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: ' admin@root.toor' })
  @IsEmail()
  email: string;
}
