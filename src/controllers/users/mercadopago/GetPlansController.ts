import { Request, Response } from 'express';
import { CreatePlansService } from '../../../services/users/mercadopago/CreatePlansService';

export class GetPlansController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await CreatePlansService.getAllPlans();
      return res.status(200).json(plans);
    } catch (error) {
      console.error(error); // Log para facilitar o debug
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}