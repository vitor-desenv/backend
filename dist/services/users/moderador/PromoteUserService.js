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
exports.PromoteUserService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class PromoteUserService {
    execute(userId, newRole) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.userDesigner.findUnique({
                where: { id: userId },
            });
            if (!user)
                throw new Error('Usuário não encontrado');
            if (user.type !== 'DEVELOPER')
                throw new Error('Apenas desenvolvedores podem ser promovidos');
            if (user.role === newRole)
                throw new Error('Usuário já possui essa função');
            const updatedUser = yield prisma_1.default.userDesigner.update({
                where: { id: userId },
                data: { role: newRole },
            });
            return updatedUser;
        });
    }
}
exports.PromoteUserService = PromoteUserService;
