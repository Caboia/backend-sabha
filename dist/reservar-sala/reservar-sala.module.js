"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservarSalaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservar_sala_entity_1 = require("./reservar-sala.entity");
const reservar_sala_service_1 = require("./reservar-sala.service");
const reservar_sala_repository_1 = require("./reservar-sala.repository");
const reservar_sala_controller_1 = require("./reservar-sala.controller");
const platform_express_1 = require("@nestjs/platform-express");
let ReservarSalaModule = class ReservarSalaModule {
};
exports.ReservarSalaModule = ReservarSalaModule;
exports.ReservarSalaModule = ReservarSalaModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            typeorm_1.TypeOrmModule.forFeature([reservar_sala_entity_1.Sala, reservar_sala_repository_1.SalaRepository])],
        providers: [reservar_sala_service_1.ReservarSalaService, reservar_sala_repository_1.SalaRepository],
        exports: [reservar_sala_service_1.ReservarSalaService, reservar_sala_repository_1.SalaRepository],
        controllers: [reservar_sala_controller_1.SalaController],
    })
], ReservarSalaModule);
//# sourceMappingURL=reservar-sala.module.js.map