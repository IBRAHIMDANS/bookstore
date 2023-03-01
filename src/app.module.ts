import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BooksModule } from '@/modules/books/books.module';
import { ConfigModule } from '@nestjs/config';
import auth from './config/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
      isGlobal: true,
      cache: true,
    }),
    BooksModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
