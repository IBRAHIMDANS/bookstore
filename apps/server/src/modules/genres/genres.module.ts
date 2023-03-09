import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  providers: [GenresService, PrismaService],
})
export class GenresModule {}
