import { Module } from '@nestjs/common';
import { SinistroController } from './sinistro.controller';
import { SinistroService } from './sinistro.service';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Module({
  controllers: [SinistroController],
  providers: [SinistroService, PrismaService],
})
export class SinistroModule {}