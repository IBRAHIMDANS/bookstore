import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async create(user: CreateUserDto) {
    user.password = await hash(user.password, 10);

    return await this.prisma.user.create({ data: user });
  }

  async signIn(user: AuthCredentialsDto): Promise<{ message: string; token: { access_token: string } }> {
    const userFound = await this.findUserByEmail(user.email);

    await this.comparePassword(user.password, userFound.password);
    const token = this.createToken(userFound);
    return { message: 'User logged in', token };
  }

  private createToken(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'mySecret',
      }),
    };
  }

  private async findUserByEmail(email: string) {
    const userFound = await this.prisma.user.findUnique({ where: { email } });
    if (!userFound) {
      throw new NotFoundException('User not found');
    }
    return userFound;
  }

  private async comparePassword(password: string, passwordFound: string): Promise<boolean> {
    const isPasswordValid = await compare(password, passwordFound);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return isPasswordValid;
  }
}
