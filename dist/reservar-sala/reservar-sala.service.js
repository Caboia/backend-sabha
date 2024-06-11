"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservarSalaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservar_sala_entity_1 = require("./reservar-sala.entity");
const reservar_sala_repository_1 = require("./reservar-sala.repository");
let ReservarSalaService = class ReservarSalaService {
    constructor(salaRepository) {
        this.salaRepository = salaRepository;
    }
    async criarSala(formData) {
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
    async listarSalas() {
        return this.salaRepository.find();
    }
    async buscarSalaPorId(id) {
        return this.salaRepository.findOne({ where: { id } });
    }
    async atualizarSala(id, formData) {
        await this.salaRepository.update(id, formData);
        return this.buscarSalaPorId(id);
    }
    async deletarSala(id) {
        await this.salaRepository.delete(id);
    }
};
exports.ReservarSalaService = ReservarSalaService;
exports.ReservarSalaService = ReservarSalaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservar_sala_entity_1.Sala)),
    __metadata("design:paramtypes", [reservar_sala_repository_1.SalaRepository])
], ReservarSalaService);
//# sourceMappingURL=reservar-sala.service.js.map