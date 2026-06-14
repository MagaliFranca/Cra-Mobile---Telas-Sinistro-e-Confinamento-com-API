import { Test, TestingModule } from '@nestjs/testing';
import { ConfinamentoController } from './confinamento.controller';

describe('ConfinamentoController', () => {
  let controller: ConfinamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfinamentoController],
    }).compile();

    controller = module.get<ConfinamentoController>(ConfinamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
