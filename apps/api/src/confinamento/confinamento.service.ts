import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class ConfinamentoService {
  constructor(private prisma: PrismaService) {}

  async criar(data: { foto?: string; latitude?: string; longitude?: string; observacoes?: string }) {
    return this.prisma.confinamento.create({ data });
  }

  async listar() {
    return this.prisma.confinamento.findMany({ orderBy: { criadoEm: 'desc' } });
  }
}