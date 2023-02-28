import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ operationId: 'findCurrentUser' })
  @ApiOkResponse({
    // type: FindMeDto,
  })
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  findCurrentUser(@CurrentUser() currentUser) {
    console.log(currentUser, 'cuurent');
    return this.usersService.findCurrentUser(currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // @Patch()
  // @UseGuards(JwtAuthGuard)
  // updateCurrentUser(@Body() user: UpdateUserDto, @CurrentUser() currentUser)
  // { return this.usersService.updateCurrentUser(user); }
}
