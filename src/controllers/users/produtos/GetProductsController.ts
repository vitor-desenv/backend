import { Request, Response } from 'express';
import { GetProductsService } from '../../../services/users/produtos/GetProductsService';

export class GetProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const produtos = await GetProductsService.getProducts();
      return res.status(200).json(produtos);
    } catch (error) {
      console.error(error); // Log para facilitar o debug
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}