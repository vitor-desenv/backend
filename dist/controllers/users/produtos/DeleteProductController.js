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
exports.DeleteProductController = void 0;
const DeleteProductService_1 = require("../../../services/users/produtos/DeleteProductService"); // Ajuste conforme seu caminho
class DeleteProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            if (!productId) {
                return res.status(400).json({ message: 'ID do produto não fornecido/incorreto.' });
            }
            try {
                // Chame o serviço para deletar o produto
                yield DeleteProductService_1.DeleteProductService.deleteProduct(productId);
                return res.status(200).json({ message: 'Produto excluído com sucesso!' });
            }
            catch (error) {
                console.error("Erro ao excluir o produto:", error); // Logando o erro
                return res.status(500).json({ message: 'Erro ao excluir o produto!', details: error.message });
            }
        });
    }
}
exports.DeleteProductController = DeleteProductController;
