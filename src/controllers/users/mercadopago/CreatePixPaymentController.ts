/*

import { Request, Response } from 'express';
import { MercadoPagoService } from '../../../services/users/mercadopago/CreatePixPaymentService';
import prismaClient from '../../../prisma'

export class CreatePixPaymentController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { transaction_amount, description, payer } = req.body;

      if (!transaction_amount || !description || !payer) {
        return res.status(400).json({ error: 'Dados insuficientes para criar o pagamento' });
      }

      const paymentData = {
        transaction_amount,
        description,
        payment_method_id: 'pix',
        payer
      };

      const payment = await MercadoPagoService.createPixPayment(paymentData);

      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

*/

import { Request, Response } from 'express';
import { CreatePixPaymentService } from '../../../services/users/mercadopago/CreatePixPaymentService';

export class CreatePixPaymentController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { productId, email } = req.body;

      if (!productId || !email) {
        return res.status(400).json({ error: 'Produto e e-mail são obrigatórios.' });
      }

      const service = new CreatePixPaymentService();
      const payment = await service.execute(productId, email);

      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
