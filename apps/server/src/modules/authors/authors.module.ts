import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  providers: [AuthorsService, PrismaService],
})
export class AuthorsModule {}
