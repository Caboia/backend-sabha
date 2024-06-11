import { Sala } from './reservar-sala.entity';
import { SalaRepository } from './reservar-sala.repository';
export declare class ReservarSalaService {
    private salaRepository;
    constructor(salaRepository: SalaRepository);
    criarSala(formData: any): Promise<Sala>;
    listarSalas(): Promise<Sala[]>;
    buscarSalaPorId(id: number): Promise<Sala | undefined>;
    atualizarSala(id: number, formData: any): Promise<Sala>;
    deletarSala(id: number): Promise<void>;
}
