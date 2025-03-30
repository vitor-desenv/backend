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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCardPaymentController = void 0;
const CreateCardPaymentService_1 = require("../../../services/users/mercadopago/CreateCardPaymentService");
const index_1 = __importDefault(require("../../../prisma/index"));
class CreateCardPaymentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const payment = yield CreateCardPaymentService_1.MercadoPagoService.createCardPayment(paymentData);
                if (payment.status === 'approved') {
                    const plan = yield index_1.default.plan.findUnique({ where: { id: planId } });
                    if (!plan) {
                        return res.status(400).json({ error: 'Plano não encontrado' });
                    }
                    // Criando a assinatura no Mercado Pago
                    const subscription = yield CreateCardPaymentService_1.MercadoPagoService.createSubscription(planId, userId);
                    if (subscription) {
                        // Atualizando o status de assinatura do usuário no banco de dados
                        const updatedSubscription = yield index_1.default.userClient.update({
                            where: { id: userId },
                            data: {
                                planId,
                                status: 'active',
                                startDate: new Date(),
                                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                                mercadoPagoSubscriptionId: subscription.id, // Salvando o ID da assinatura
                            },
                        });
                        return res.status(201).json({ message: 'Pagamento aprovado e assinatura criada!', payment, updatedSubscription });
                    }
                    return res.status(500).json({ error: 'Erro ao criar assinatura no Mercado Pago' });
                }
                return res.status(400).json({ error: 'Pagamento não aprovado', payment });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CreateCardPaymentController = CreateCardPaymentController;
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
