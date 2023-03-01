import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

export type GetMyProfile = {
  message: string;
  profile: Omit<User, 'password' | 'createdAt' | 'updatedAt' | 'isDeleted' | 'deletedAt' | 'authentications'>;
};

@Injectable()
export class UsersService {
  constructor(private readonly primsa: PrismaService) {}

  getMyProfile(user: User): GetMyProfile {
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.isDeleted;
    delete user.deletedAt;
    delete user.authentications;
    return {
      message: 'Update current user data successfully',
      profile: user,
    };
  }

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
      currentUser = await this.primsa.user.update({
        where: { id: currentUser.id },
        data: user,
      });
    } catch (e) {
      return new BadRequestException(e.message);
    }
    return this.getMyProfile(currentUser);
  }

  async findCurrentUser(user: User) {
    return await this.findById(user.id);
  }
}
