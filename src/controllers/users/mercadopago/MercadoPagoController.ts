import { Request, Response } from 'express';
import { MercadoPagoService } from '../../../services/users/mercadopago/MercadoPagoService';

export class MercadoPagoController {
  static async callback(req: Request, res: Response) {
    try {
      const { status, payment_id, external_reference } = req.query;

      console.log('Callback recebido:', req.query);

      if (status === 'approved' && payment_id && external_reference) {
        await MercadoPagoService.updateUserSubscription(String(external_reference));

        return res.json({ message: 'Assinatura confirmada!', paymentId: payment_id });
      }

      return res.status(400).json({ error: 'Pagamento não aprovado ou pendente' });
    } catch (error) {
      console.error('Erro no callback:', error);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  static async webhook(req: Request, res: Response) {
    try {
      console.log('Webhook recebido:', req.body);

      const { action, data } = req.body;

      if ((action === 'payment.created' || action === 'payment.updated') && data.id) {
        const paymentData = await MercadoPagoService.processPayment(String(data.id));

        if (paymentData.status === 'approved') {
          await MercadoPagoService.updateUserSubscription(paymentData.external_reference);
        }
      }

      return res.sendStatus(200);
    } catch (error) {
      console.error('Erro no webhook:', error);
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}