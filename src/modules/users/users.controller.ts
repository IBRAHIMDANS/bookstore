import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getCurrentUser(@CurrentUser() user) {
    return user;
  }
}
