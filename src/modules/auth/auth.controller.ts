import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'signUp' })
  @Post('/sign-up')
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.create(user);
  }

  @ApiCreatedResponse({ description: 'User signed in successfully' })
  @ApiOperation({ operationId: 'signIn' })
  @ApiConflictResponse()
  @Post('/sign-in')
  signIn(@Body(ValidationPipe) user: AuthCredentialsDto) {
    return this.authService.signIn(user);
  }
}
