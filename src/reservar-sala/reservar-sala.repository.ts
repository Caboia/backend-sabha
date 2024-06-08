import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sala } from './reservar-sala.entity';

@Injectable()
export class SalaRepository extends Repository<Sala> {}
