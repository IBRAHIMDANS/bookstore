import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ operationId: 'findAll' })
  @ApiCreatedResponse({ description: 'Users found successfully' })
  @ApiConflictResponse()
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ operationId: 'findCurrentUser' })
  @ApiOkResponse({
    type: UpdateUserDto,
  })
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  findCurrentUser(@CurrentUser() currentUser) {
    return this.usersService.findCurrentUser(currentUser);
  }

  @Patch('/me')
  @ApiOperation({ operationId: 'updateCurrentUser' })
  @ApiOkResponse({
    type: UpdateUserDto,
    description: 'Update current user data successfully',
  })
  @UseGuards(JwtAuthGuard)
  updateCurrentUser(@Body() user: UpdateUserDto, @CurrentUser() currentUser) {
    return this.usersService.updateCurrentUser(currentUser, user);
  }
}
