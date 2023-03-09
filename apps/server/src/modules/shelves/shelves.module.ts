import { Module } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { ShelvesController } from './shelves.controller';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Module({
  controllers: [ShelvesController],
  providers: [ShelvesService, PrismaService],
})
export class ShelvesModule {}
