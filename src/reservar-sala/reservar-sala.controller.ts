import { Controller, Post, Body, Get, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ReservarSalaService } from './reservar-sala.service';
import { Sala } from './reservar-sala.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('sala')
export class SalaController {
  constructor(private readonly reservarSalaService: ReservarSalaService) {}

  @Post('reservar')
  @UseInterceptors(FileInterceptor('roomImage', {
    storage: diskStorage({
      destination: './uploads', // Pasta onde a imagem será salva
      filename: (req, file, callback) => {
        // Define o nome do arquivo como um timestamp + extensão original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // Limita o tamanho do arquivo a 5MB
    }
  }))
  async reservarSala(
    @Body() formData: any,
    @UploadedFile() roomImage: Express.Multer.File
  ): Promise<string> {
    try {
      if (roomImage) {
        formData.roomImage = roomImage.filename; // Atribuir o nome do arquivo à propriedade roomImage
      }

      const reserva = await this.reservarSalaService.criarSala(formData);
      return `Sala reservada com sucesso! ID da reserva: ${reserva.id}`;
    } catch (error) {
      console.error('Erro ao reservar sala:', error);
      throw new Error('Erro ao reservar a sala. Tente novamente mais tarde.');
    }
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
