"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlansService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CreatePlansService {
    static createPlan(name, price, tag, benefits, maxDownloads) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Criando o plano no banco de dados
                const plan = yield prisma.plan.create({
                    data: { name, price, tag, benefits, maxDownloads }
                });
                return plan;
            }
            catch (error) {
                throw new Error('Erro ao criar plano');
            }
        });
    }
    static getAllPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscando todos os planos
                return yield prisma.plan.findMany();
            }
            catch (error) {
                throw new Error('Erro ao buscar planos');
            }
        });
    }
}
exports.CreatePlansService = CreatePlansService;
