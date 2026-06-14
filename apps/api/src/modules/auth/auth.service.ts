import { Injectable, UnauthorizedException } from '@nestjs/common';

const USUARIOS_EXEMPLO = [
  { matricula: '12345', senha: '1234', nome: 'Usuário Teste' },
];

@Injectable()
export class AuthService {
  async login(matricula: string, senha: string) {
    const usuario = USUARIOS_EXEMPLO.find(
      (u) => u.matricula === matricula && u.senha === senha,
    );
    if (!usuario) {
      throw new UnauthorizedException('Matrícula ou senha incorretos');
    }
    return { sucesso: true, nome: usuario.nome, matricula: usuario.matricula };
  }
}