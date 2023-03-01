import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly primsa: PrismaService) {}

  async findById(id: string): Promise<User> {
    return await this.primsa.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findAll() {
    return this.primsa.user.findMany();
  }

  async updateCurrentUser(currentUser: User, user: UpdateUserDto) {
    if (user.password) {
      user.password = await hash(user.password, 10);
    }
    try {
      const newUser = await this.primsa.user.update({
        where: { id: currentUser.id },
        data: user,
      });
      delete newUser.password;
      delete newUser.createdAt;
      delete newUser.updatedAt;
      delete newUser.isDeleted;
      delete newUser.deletedAt;
      delete newUser.authentications;
      return {
        message: 'Update current user data successfully',
        data: newUser,
      };
    } catch (e) {
      return new BadRequestException(e.message);
    }
  }

  async findCurrentUser(user: User) {
    return await this.findById(user.id);
  }
}
