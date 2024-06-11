import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ReservarSalaService } from './reservar-sala.service';
import { Sala } from './reservar-sala.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

// Importe o tipo correto do Multer
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); 
  }
});

const upload = multer({ storage: storage });



@Controller('sala')
export class SalaController {
  constructor(private readonly reservarSalaService: ReservarSalaService) {}

  @Post('reservar')
  @UseInterceptors(FileInterceptor('roomImage')) // Use o interceptor do NestJS para processar o arquivo
  async reservarSala(@Body() formData: any, @UploadedFile() roomImage: Multer.File): Promise<string> {
    // Aqui, você pode acessar o arquivo usando a variável 'roomImage'
    // Por exemplo, você pode salvar o arquivo em algum local ou fazer outras operações com ele
    // ...
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

  @Get() // Endpoint para buscar todas as salas
  async buscarTodasAsSalas(): Promise<Sala[]> {
    return this.reservarSalaService.listarSalas();
  }

  @Put('atualizar/:id')
  async atualizarSala(
    @Param('id') id: number,
    @Body() formData: any
  ): Promise<Sala | string> {
    const salaAtualizada = await this.reservarSalaService.atualizarSala(id, formData);
    if (salaAtualizada) {
      return salaAtualizada;
    } else {
      return `Sala com ID ${id} não encontrada para atualização.`;
    }
  }

  @Delete('deletar/:id')
  async deletarSala(@Param('id') id: number): Promise<string> {
    const salaExistente = await this.reservarSalaService.buscarSalaPorId(id);
    if (salaExistente) {
      await this.reservarSalaService.deletarSala(id);
      return `Sala com ID ${id} deletada com sucesso.`;
    } else {
      return `Sala com ID ${id} não encontrada para deleção.`;
    }
  }
}
