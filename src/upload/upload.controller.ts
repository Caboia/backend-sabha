import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../frontend/public/uploads', // Pasta onde a imagem será salva
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) { 
    // Construir a URL completa da imagem
    const host = 'http://localhost:3000'; 
    const imagePath = `/uploads/${file.filename}`;
    const imageUrl = `${host}${imagePath}`;

    // Retornar os dados incluindo a URL da imagem
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
      size: file.size,
      url: imageUrl, // Incluir a URL da imagem na resposta
    };
  }
}
