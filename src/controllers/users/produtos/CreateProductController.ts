import { Request, Response } from 'express';
import { CreateProductService } from '../../../services/users/produtos/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name_art, price, category_id } = req.body;
        const designer_id = req.user_id;

        if (!designer_id) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Erro, é obrigatório carregar a imagem" });
        }

        const { filename: banner } = req.file;

        // Validação e conversão do preço para centavos
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({ error: "Preço inválido" });
        }
        const priceInCents = Math.round(parsedPrice * 100); // Converte para centavos

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name_art,
            price: priceInCents, // Agora enviamos um inteiro para o Service
            banner,
            category_id,
            designer_id
        });

        return res.json(product);
    }
}

export { CreateProductController };
