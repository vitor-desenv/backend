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
exports.DeleteUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteUserService {
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o usuário existe e a qual tabela pertence
                const userDesigner = yield prisma_1.default.userDesigner.findUnique({
                    where: { id: userId }
                });
                const userClient = yield prisma_1.default.userClient.findUnique({
                    where: { id: userId }
                });
                if (!userDesigner && !userClient) {
                    throw new Error('Usuário não encontrado.');
                }
                // Se for um designer precisamos excluir os posts antes
                if (userDesigner) {
                    yield prisma_1.default.postDesignerProduct.deleteMany({
                        where: { designer_id: userId }
                    });
                    yield prisma_1.default.userDesigner.delete({
                        where: { id: userId }
                    });
                }
                // Se for um cliente, apenas vamos deletar o usuário
                if (userClient) {
                    yield prisma_1.default.userClient.delete({
                        where: { id: userId }
                    });
                }
                return { message: 'Usuário excluído com sucesso!' };
            }
            catch (error) {
                throw new Error('Erro ao excluir o usuário: ' + error.message);
            }
        });
    }
}
exports.DeleteUserService = DeleteUserService;
