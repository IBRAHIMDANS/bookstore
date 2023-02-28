import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly primsa: PrismaService) {}

  findById(id: string) {
    return this.primsa.user.findMany({
      where: {
        id: id,
      },
    });
  }

  findAll() {
    return this.primsa.user.findMany();
  }

  updateCurrentUser(user: UpdateUserDto) {
    return this.primsa.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }

  findCurrentUser(user: User) {
    return this.findById(user.id);
  }
}
