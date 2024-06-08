// src/reservar-sala/sala.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './reservar-sala.entity';
import { SalaRepository } from './reservar-sala.repository';

@Injectable()
export class ReservarSalaService {
  constructor(
    @InjectRepository(Sala)
    private salaRepository: SalaRepository,
  ) {}

  async criarSala(formData: any): Promise<Sala> {
    const { roomName, roomImage, roomLocation, dateOfUse, startTime, endTime, responsiblePerson, reasonForUse, additionalInfo, guests } = formData;
  
    const novaSala = this.salaRepository.create({
      roomName,
      roomImage,
      roomLocation,
      dateOfUse,
      startTime,
      endTime,
      responsiblePerson,
      reasonForUse,
      additionalInfo,
      guests
    });
  
    return this.salaRepository.save(novaSala);
  }

  async listarSalas(): Promise<Sala[]> {
    return this.salaRepository.find();
  }

  async buscarSalaPorId(id: number): Promise<Sala | undefined> {
    return this.salaRepository.findOne({ where: { id } });
  }  

  async atualizarSala(id: number, formData: any): Promise<Sala> {
    await this.salaRepository.update(id, formData);
    return this.buscarSalaPorId(id);
  }

  async deletarSala(id: number): Promise<void> {
    await this.salaRepository.delete(id);
  }
}