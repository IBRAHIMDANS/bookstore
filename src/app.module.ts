import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BooksModule } from '@/modules/books/books.module';
import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';
import { ConfigModule } from '@nestjs/config';
import auth from './modules/config/auth';

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
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
