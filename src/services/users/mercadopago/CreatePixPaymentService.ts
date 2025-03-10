/*
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid'; // Importando para gerar UUID

//PRECISO COLOCAR ISSO EM UMA VARIAVEL DE AMBIENTE PARA DEPLOY
const accessToken = 'TEST-7126931419506998-020211-d0ab193bc4e96e058659224d3729c28a-2247024662';

interface Payer {
  email: string;
  first_name: string;
  last_name: string;
  identification: {
    type: string;
    number: string;
  };
}

interface PaymentRequest {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  payer: Payer;
}

export class MercadoPagoService {
  static async createPixPayment(paymentData: PaymentRequest) {
    try {
      const response = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-Idempotency-Key': uuidv4() // Gera um UUID único para cada requisição
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Erro ${result.status}: ${result.message}`);
      }

      return result;
    } catch (error) {
      throw new Error(`Erro ao criar pagamento: ${error}`);
    }
  }
}

*/

import { MercadoPagoConfig, Payment } from 'mercadopago';
import prismaClient from '../../../prisma';

export class CreatePixPaymentService {
  async execute(productId: string, userEmail: string) {
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const payment = new Payment(client);

    // 🔹 1. Buscar o produto no banco de dados
    const product = await prismaClient.postDesignerProduct.findUnique({
      where: { id: productId },
      include: { designer: true }, // Buscar o designer que criou o produto
    });

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    /*
    if (!product.status) {
      throw new Error('Este produto não está disponível para compra.');
    }
    */

    const userClient = await prismaClient.userClient.findUnique({
      where: { email: userEmail },
    });
    
    if (!userClient) {
      throw new Error('Usuário não encontrado');
    }

    // 🔹 2. Criar o pagamento via Pix
    const transactionAmount = product.price / 100; // Convertendo centavos para reais

    const paymentData = {
      transaction_amount: product.price / 100,
      description: product.name_art,
      payment_method_id: 'pix',
      payer: { email: userEmail },
    };

    const response = await payment.create({ body: paymentData });

    // 🔹 3. Criar o pedido no banco de dados
    const order = await prismaClient.order.create({
      data: {
        status: 'pending',
        transaction_id: response.id.toString(),
        total_amount: transactionAmount,
        user_client_id: userClient.id,
        product_id: product.id,
        user_designer_id: product.designer.id,
      },
    });

    return {
      qr_code: response.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
      copy_paste: response.point_of_interaction.transaction_data.ticket_url,
      order_id: order.id, // Retorna o ID do pedido para referência
    };
  }
}