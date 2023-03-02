import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from '@/modules/auth/dto/auth.credentials.dto';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenDto } from '@/modules/auth/dto/token.dto';
import { MailsService } from '@/modules/mails/mails.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailsService,
  ) {}

  async signUp(user: CreateUserDto) {
    const userFound = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (userFound) {
      throw new UnauthorizedException('User already exists');
    }

    const userCreated = await this.prisma.user.create({
      data: {
        email: user.email,
        password: await hash(user.password, 10),
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        role: user.role,
      },
    });
    const token = this.jwtService.sign({ id: userCreated.id }, { expiresIn: 60 * 15 });
    const mail = await this.mailService.sendEmail({
      to: userCreated.email,
      subject: 'Welcome to the BookStore !',
      html: `
        <p>Hi ${userCreated.firstName},</p>
        <p>Welcome to the BookStore APP!</p>
        <p>Thanks for signing up.</p>
        <p>Click on the link below to confirm your email address and activate your account </p>
        <p> Be carreful the link are valid for 15 minutes. :) </p>
        <a href='${this.configService.get('app.baseUrl')}/api/v1/auth/confirm/${
        userCreated.id
      }?token=${token}' > Confirm email </a>
        
       
        <p>Best regards,</p>
        <p>The Book Store Team</p>
      `,
    });
    return Promise.all([userCreated, mail])
      .then(() => {
        return { message: 'User created and email sent' };
      })
      .catch(e => {
        throw new BadRequestException(e.message);
      });
  }

  async signIn(user: AuthCredentialsDto): Promise<{ message: string; token: TokenDto }> {
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

  async confirmEmail(id: string, token: string) {
    try {
      const userFound = await this.prisma.user.findUnique({
        where: { id: id },
      });
      if (!userFound) {
        throw new NotFoundException('User not found');
      }
      this.jwtService.verify(token, { ignoreExpiration: false });
      await this.prisma.user.update({
        where: { id: id },
        data: {
          isEmailVerified: true,
        },
      });
      return { message: 'User confirmed' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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

  private createToken(user: any): TokenDto {
    return {
      expiresIn: this.configService.get('auth.expiresIn'),
      accessToken: this.jwtService.sign({ id: user.id }, { expiresIn: this.configService.get('auth.expiresIn') }),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      id: user.id,
    };
  }
}
