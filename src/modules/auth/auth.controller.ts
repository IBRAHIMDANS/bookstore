import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiConflictResponse()
  @ApiOperation({ operationId: 'signUp' })
  @Post('/sign-up')
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @ApiCreatedResponse({ description: 'User signed in successfully' })
  @ApiOperation({ operationId: 'signIn' })
  @ApiConflictResponse()
  @Post('/sign-in')
  signIn(@Body(ValidationPipe) user: AuthCredentialsDto) {
    return this.authService.signIn(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ operationId: 'deleteMyAccount' })
  @ApiCreatedResponse({ description: 'User deleted successfully' })
  @ApiConflictResponse()
  @Delete('/delete')
  deleteMyAccount(@CurrentUser() user) {
    return this.authService.deleteMyAccount(user);
  }

  @ApiOperation({ operationId: 'confirmEmail' })
  @ApiCreatedResponse({ description: 'User confirmed successfully' })
  @ApiConflictResponse()
  @Get('/confirm/:id')
  confirmEmail(@Param('id') id: string, @Query('token') token: string) {
    return this.authService.confirmEmail(id, token);
  }
}
