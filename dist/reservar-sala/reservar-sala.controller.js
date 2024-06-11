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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaController = void 0;
const common_1 = require("@nestjs/common");
const reservar_sala_service_1 = require("./reservar-sala.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const multer_2 = __importDefault(require("multer"));
const storage = multer_2.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});
const upload = (0, multer_2.default)({ storage: storage });
let SalaController = class SalaController {
    constructor(reservarSalaService) {
        this.reservarSalaService = reservarSalaService;
    }
    async reservarSala(formData, roomImage) {
        const reserva = await this.reservarSalaService.criarSala(formData);
        return `Sala reservada com sucesso! ID da reserva: ${reserva.id}`;
    }
    async criarSala(formData) {
        return this.reservarSalaService.criarSala(formData);
    }
    async buscarSalaPorId(id) {
        return this.reservarSalaService.buscarSalaPorId(id);
    }
    async buscarTodasAsSalas() {
        return this.reservarSalaService.listarSalas();
    }
    async atualizarSala(id, formData) {
        const salaAtualizada = await this.reservarSalaService.atualizarSala(id, formData);
        if (salaAtualizada) {
            return salaAtualizada;
        }
        else {
            return `Sala com ID ${id} não encontrada para atualização.`;
        }
    }
    async deletarSala(id) {
        const salaExistente = await this.reservarSalaService.buscarSalaPorId(id);
        if (salaExistente) {
            await this.reservarSalaService.deletarSala(id);
            return `Sala com ID ${id} deletada com sucesso.`;
        }
        else {
            return `Sala com ID ${id} não encontrada para deleção.`;
        }
    }
};
exports.SalaController = SalaController;
__decorate([
    (0, common_1.Post)('reservar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('roomImage')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof multer_1.Multer !== "undefined" && multer_1.Multer.File) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "reservarSala", null);
__decorate([
    (0, common_1.Post)('criar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "criarSala", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "buscarSalaPorId", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "buscarTodasAsSalas", null);
__decorate([
    (0, common_1.Put)('atualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "atualizarSala", null);
__decorate([
    (0, common_1.Delete)('deletar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SalaController.prototype, "deletarSala", null);
exports.SalaController = SalaController = __decorate([
    (0, common_1.Controller)('sala'),
    __metadata("design:paramtypes", [reservar_sala_service_1.ReservarSalaService])
], SalaController);
//# sourceMappingURL=reservar-sala.controller.js.map