import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReservarSalaService } from './reservar-sala.service';
import { Sala } from './reservar-sala.entity';

@Controller('sala')
export class SalaController {
  constructor(private readonly reservarSalaService: ReservarSalaService) {}

  @Post('reservar')
  async reservarSala(@Body() formData: any): Promise<string> {
  const reserva = await this.reservarSalaService.criarSala(formData);
  return `Sala reservada com sucesso! ID da reserva: ${reserva.id}`;
}

  @Post('criar')  
  async criarSala(@Body() formData: any): Promise<Sala> {
    return this.reservarSalaService.criarSala(formData);
  }

  @Get(':id')
  async buscarSalaPorId(@Param('id') id: number): Promise<Sala | undefined> {
    return this.reservarSalaService.buscarSalaPorId(id);
  }
}
