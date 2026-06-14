import { Module } from '@nestjs/common';
import { ConfinamentoController } from './confinamento.controller';
import { ConfinamentoService } from './confinamento.service';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Module({
  controllers: [ConfinamentoController],
  providers: [ConfinamentoService, PrismaService],
})
export class ConfinamentoModule {}