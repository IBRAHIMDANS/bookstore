import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';

export class CreateUserDto extends AuthCredentialsDto {
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({ required: true, description: "User's name" })
  name: string;
}
