/// <reference types="multer" />
import { ReservarSalaService } from './reservar-sala.service';
import { Sala } from './reservar-sala.entity';
export declare class SalaController {
    private readonly reservarSalaService;
    constructor(reservarSalaService: ReservarSalaService);
    reservarSala(formData: any, roomImage: Express.Multer.File): Promise<string>;
    criarSala(formData: any): Promise<Sala>;
    buscarSalaPorId(id: number): Promise<Sala | undefined>;
    buscarTodasAsSalas(): Promise<Sala[]>;
    atualizarSala(id: number, formData: any): Promise<Sala | string>;
    deletarSala(id: number): Promise<string>;
}
