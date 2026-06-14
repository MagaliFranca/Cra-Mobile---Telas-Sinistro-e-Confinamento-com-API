import { Controller, Get, Post, Body } from '@nestjs/common';
import { SinistroService } from './sinistro.service';

@Controller('sinistro')
export class SinistroController {
  constructor(private readonly sinistroService: SinistroService) {}

  @Post()
  criar(@Body() body: { foto?: string; tipo: string; trecho: string; descricao?: string }) {
    return this.sinistroService.criar(body);
  }

  @Get()
  listar() {
    return this.sinistroService.listar();
  }
}