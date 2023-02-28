import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export type TokenType = {
  expiresIn: string;
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  id: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(user: CreateUserDto) {
    const userFound = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (userFound) {
      throw new UnauthorizedException();
    }

    return await this.prisma.user.create({
      data: {
        email: user.email,
        password: await hash(user.password, 10),
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        role: user.role,
      },
    });
  }

  async signIn(user: AuthCredentialsDto): Promise<{ message: string; token: TokenType }> {
    const userFound = await this.findUserByEmail(user.email);

    await this.comparePassword(user.password, userFound.password);
    const token = this.createToken(userFound);
    return { message: 'User logged in', token };
  }

  async deleteMyAccount(user) {
    try {
      await this.prisma.user.delete({ where: { id: user.id } });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted' };
  }

  private createToken(user: any): TokenType {
    return {
      expiresIn: this.configService.get('auth.expiresIn'),
      accessToken: this.jwtService.sign({ id: user.id }),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      id: user.id,
    };
  }

  private async comparePassword(password: string, passwordFound: string): Promise<boolean> {
    const isPasswordValid = await compare(password, passwordFound);
    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }
    return isPasswordValid;
  }

  private async findUserByEmail(email: string) {
    const userFound = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!userFound || userFound.isActive === false) {
      throw new UnauthorizedException('invalid credentials or user not isActive yet ');
    }
    return userFound;
  }
}
