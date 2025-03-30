"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePixPaymentController = void 0;
const CreatePixPaymentService_1 = require("../../../services/users/mercadopago/CreatePixPaymentService");
class CreatePixPaymentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, email } = req.body;
                if (!productId || !email) {
                    return res.status(400).json({ error: 'Produto e e-mail são obrigatórios.' });
                }
                const service = new CreatePixPaymentService_1.CreatePixPaymentService();
                const payment = yield service.execute(productId, email);
                return res.status(201).json(payment);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CreatePixPaymentController = CreatePixPaymentController;
