import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { MailsService } from '@/modules/mails/mails.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: configService.get('auth.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, MailsService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
