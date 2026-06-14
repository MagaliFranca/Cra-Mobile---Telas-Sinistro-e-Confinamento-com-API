import { Test, TestingModule } from '@nestjs/testing';
import { SinistroController } from './sinistro.controller';

describe('SinistroController', () => {
  let controller: SinistroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinistroController],
    }).compile();

    controller = module.get<SinistroController>(SinistroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
