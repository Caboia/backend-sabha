import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './reservar-sala.entity';
import { ReservarSalaService } from './reservar-sala.service';
import { SalaRepository } from './reservar-sala.repository'; 
import { SalaController } from './reservar-sala.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({
    dest: './uploads',
  }),
TypeOrmModule.forFeature([Sala, SalaRepository])],
  providers: [ReservarSalaService, SalaRepository],
  exports: [ReservarSalaService, SalaRepository], 
  controllers: [SalaController],
})
export class ReservarSalaModule {}
