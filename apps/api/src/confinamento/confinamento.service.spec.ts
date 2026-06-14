import { Test, TestingModule } from '@nestjs/testing';
import { ConfinamentoService } from './confinamento.service';

describe('ConfinamentoService', () => {
  let service: ConfinamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfinamentoService],
    }).compile();

    service = module.get<ConfinamentoService>(ConfinamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
