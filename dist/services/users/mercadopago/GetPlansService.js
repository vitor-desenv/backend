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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlansService = void 0;
const index_1 = __importDefault(require("../../../prisma/index"));
class GetPlansService {
    static getAllPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscando todos os planos no banco de dados usando a instância do Prisma
                return yield index_1.default.plan.findMany();
            }
            catch (error) {
                throw new Error('Erro ao buscar planos');
            }
        });
    }
}
exports.GetPlansService = GetPlansService;
