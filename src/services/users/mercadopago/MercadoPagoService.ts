import fetch from 'node-fetch';
import prismaClient from '../../../prisma/index';

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

export class MercadoPagoService {
  static async processPayment(paymentId: string) {
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const paymentData = await response.json();

      if (!response.ok) {
        throw new Error(`Erro ao buscar pagamento: ${paymentData.message}`);
      }

      return paymentData;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw new Error('Erro ao processar pagamento');
    }
  }

  static async updateUserSubscription(userId: string) {
    try {
      return await prismaClient.userClient.update({
        where: { id: userId },
        data: { status: 'active' },
      });
    } catch (error) {
      console.error('Erro ao atualizar assinatura do usuário:', error);
      throw new Error('Erro ao atualizar assinatura');
    }
  }
}