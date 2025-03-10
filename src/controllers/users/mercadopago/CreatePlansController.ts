import { Request, Response } from 'express';
import { CreatePlansService } from '../../../services/users/mercadopago/CreatePlansService';

export class CreatePlansController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price, tag, benefits, maxDownloads } = req.body;

    try {
      // Validação de campos obrigatórios
      if (!name || !price || !tag || !benefits || !maxDownloads) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Chamando o serviço para criar o plano
      const plan = await CreatePlansService.createPlan(name, price, tag, benefits, maxDownloads);

      return res.status(201).json(plan);
    } catch (error) {
      console.error(error); // Importante para facilitar o debug
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export class GetPlansController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const plans = await CreatePlansService.getAllPlans();
      return res.status(200).json(plans);
    } catch (error) {
      console.error(error); // Importante para facilitar o debug
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}