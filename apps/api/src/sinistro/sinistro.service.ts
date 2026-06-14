import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/database/prisma.service';

@Injectable()
export class SinistroService {
  constructor(private prisma: PrismaService) {}

  async criar(data: { foto?: string; tipo: string; trecho: string; descricao?: string }) {
    return this.prisma.sinistro.create({ data });
  }

  async listar() {
    return this.prisma.sinistro.findMany({ orderBy: { criadoEm: 'desc' } });
  }
}