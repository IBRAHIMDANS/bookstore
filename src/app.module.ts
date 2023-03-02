import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { BooksModule } from '@/modules/books/books.module';
import { ReviewsModule } from '@/modules/reviews/reviews.module';
import { MailsModule } from './modules/mails/mails.module';

import auth from './config/auth';
import mail from '@/config/mail';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth, mail],
      isGlobal: true,
      cache: true,
    }),
    BooksModule,
    AuthModule,
    UsersModule,
    ReviewsModule,
    MailsModule,
  ],
  providers: [],
})
export class AppModule {}
