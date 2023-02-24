import { Module } from '@nestjs/common';
import { UsersModule } from '@/modules/users/users.module';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { AuthController } from './auth.controller';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard, PrismaService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
