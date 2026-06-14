import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SinistroModule } from './sinistro/sinistro.module';
import { ConfinamentoModule } from './confinamento/confinamento.module';

@Module({
  imports: [SinistroModule, ConfinamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
