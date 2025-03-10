import { Request, Response } from 'express';
import { MercadoPagoService } from '../../../services/users/mercadopago/CreateCardPaymentService';
import prismaClient from '../../../prisma/index';

export class CreateCardPaymentController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { transaction_amount, token, description, installments, payment_method_id, payer, planId, userId } = req.body;

      if (!transaction_amount || !token || !description || !installments || !payment_method_id || !payer || !planId || !userId) {
        return res.status(400).json({ error: 'Dados insuficientes para criar o pagamento' });
      }

      const paymentData = {
        transaction_amount,
        token,
        description,
        installments,
        payment_method_id,
        payer
      };

      const payment = await MercadoPagoService.createCardPayment(paymentData);

      if (payment.status === 'approved') {
        const plan = await prismaClient.plan.findUnique({ where: { id: planId } });
        if (!plan) {
          return res.status(400).json({ error: 'Plano não encontrado' });
        }

        // Criando a assinatura no Mercado Pago
        const subscription = await MercadoPagoService.createSubscription(planId, userId);

        if (subscription) {
          // Atualizando o status de assinatura do usuário no banco de dados
          const updatedSubscription = await prismaClient.userClient.update({
            where: { id: userId },
            data: {
              planId,
              status: 'active',
              startDate: new Date(),
              endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              mercadoPagoSubscriptionId: subscription.id,  // Salvando o ID da assinatura
            },
          });

          return res.status(201).json({ message: 'Pagamento aprovado e assinatura criada!', payment, updatedSubscription });
        }
        return res.status(500).json({ error: 'Erro ao criar assinatura no Mercado Pago' });
      }

      return res.status(400).json({ error: 'Pagamento não aprovado', payment });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

// ------------------------------> ANTES DA ATUALIZAÇÃO DAS ASSINATURAS DO MERCADO PAGO <-----------------------------------//
// import { Request, Response } from 'express';
// import { MercadoPagoService } from '../../../services/users/mercadopago/CreateCardPaymentService';
// import prismaClient from '../../../prisma/index';

// export class CreateCardPaymentController {
//   async handle(req: Request, res: Response): Promise<Response> {
//     try {
//       const { transaction_amount, token, description, installments, payment_method_id, payer, planId, userId } = req.body;

//       if (!transaction_amount || !token || !description || !installments || !payment_method_id || !payer || !planId || !userId) {
//         return res.status(400).json({ error: 'Dados insuficientes para criar o pagamento' });
//       }

//       const paymentData = {
//         transaction_amount,
//         token,
//         description,
//         installments,
//         payment_method_id,
//         payer
//       };

//       const payment = await MercadoPagoService.createCardPayment(paymentData);

//       if (payment.status === 'approved') {
//         const plan = await prismaClient.plan.findUnique({ where: { id: planId } });
//         if (!plan) {
//           return res.status(400).json({ error: 'Plano não encontrado' });
//         }

//         // Criando a assinatura no Mercado Pago
//         const subscription = await MercadoPagoService.createSubscription(planId, userId);

//         if (subscription) {
//           // Atualizando o status de assinatura do usuário
//           const updatedSubscription = await prismaClient.userClient.update({
//             where: { id: userId },
//             data: {
//               planId,
//               status: 'active',
//               startDate: new Date(),
//               endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//             },
//           });

//           return res.status(201).json({ message: 'Pagamento aprovado e assinatura criada!', payment, updatedSubscription });
//         }
//         return res.status(500).json({ error: 'Erro ao criar assinatura no Mercado Pago' });
//       }

//       return res.status(400).json({ error: 'Pagamento não aprovado', payment });
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }

// ------------------------------> ANTES DA ATUALIZAÇÃO DAS TABELAS PLANOS <-----------------------------------//
// import { Request, Response } from 'express';
// import { MercadoPagoService } from '../../../services/users/mercadopago/CreateCardPaymentService';

// export class CreateCardPaymentController {
//   async handle(req: Request, res: Response): Promise<Response> {
//     try {
//       const { transaction_amount, token, description, installments, payment_method_id, payer } = req.body;

//       if (!transaction_amount || !token || !description || !installments || !payment_method_id || !payer) {
//         return res.status(400).json({ error: 'Dados insuficientes para criar o pagamento' });
//       }

//       const paymentData = {
//         transaction_amount,
//         token,
//         description,
//         installments,
//         payment_method_id,
//         payer
//       };

//       const payment = await MercadoPagoService.createCardPayment(paymentData);

//       return res.status(201).json(payment);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   }
// }