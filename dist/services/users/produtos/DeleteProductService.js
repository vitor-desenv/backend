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
exports.DeleteProductService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteProductService {
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifique se o id está sendo passado corretamente
                console.log("Tentando excluir produto com id:", id);
                return yield prisma_1.default.postDesignerProduct.delete({
                    where: {
                        id: id, // Passando o id correto
                    },
                });
            }
            catch (error) {
                console.error("Erro ao excluir o produto:", error); // Logando o erro
                throw new Error('Erro ao excluir o produto: ' + error.message);
            }
        });
    }
}
exports.DeleteProductService = DeleteProductService;
