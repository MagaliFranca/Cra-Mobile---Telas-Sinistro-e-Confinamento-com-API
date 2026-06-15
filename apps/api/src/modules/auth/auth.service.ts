import { Injectable, UnauthorizedException } from '@nestjs/common';

const USUARIOS_EXEMPLO = [
  { matricula: '1234', nome: 'Usuário Teste' },
];

@Injectable()
export class AuthService {
  async login(matricula: string) {
    const usuario = USUARIOS_EXEMPLO.find(
      (u) => u.matricula === matricula,
    );
    if (!usuario) {
      throw new UnauthorizedException('Matrícula incorreta');
    }
    return { sucesso: true, nome: usuario.nome, matricula: usuario.matricula };
  }
}