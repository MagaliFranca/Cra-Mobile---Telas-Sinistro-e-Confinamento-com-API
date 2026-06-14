import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConfinamentoService } from './confinamento.service';

@Controller('confinamento')
export class ConfinamentoController {
  constructor(private readonly confinamentoService: ConfinamentoService) {}

  @Post()
  criar(@Body() body: { foto?: string; latitude?: string; longitude?: string; observacoes?: string }) {
    return this.confinamentoService.criar(body);
  }

  @Get()
  listar() {
    return this.confinamentoService.listar();
  }
}