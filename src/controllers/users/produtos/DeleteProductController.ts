import { Request, Response } from 'express';
import { DeleteProductService } from '../../../services/users/produtos/DeleteProductService'; // Ajuste conforme seu caminho

export class DeleteProductController {
    async handle(req: Request, res: Response) {
        const { productId } = req.params;
        
        if (!productId) {
            return res.status(400).json({ message: 'ID do produto não fornecido/incorreto.' });
        }

        try {
            // Chame o serviço para deletar o produto
            await DeleteProductService.deleteProduct(productId);
            return res.status(200).json({ message: 'Produto excluído com sucesso!' });
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);  // Logando o erro
            return res.status(500).json({ message: 'Erro ao excluir o produto!', details: error.message });
        }
    }
}
