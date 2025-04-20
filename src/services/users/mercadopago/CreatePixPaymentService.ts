/*
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid'; // Importando para gerar UUID

const accessToken = 'process.env.MERCADO_PAGO_ACCESS_TOKEN';

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

// import fetch from 'node-fetch';
// import prismaClient from '../../../prisma';

// export class CreatePixPaymentService {
//   async execute(productId: string, userEmail: string) {
//     const product = await prismaClient.postDesignerProduct.findUnique({
//       where: { id: productId },
//       include: { designer: true },
//     });

//     if (!product) throw new Error('Produto não encontrado');

//     const userClient = await prismaClient.userClient.findUnique({
//       where: { email: userEmail },
//     });

//     if (!userClient) throw new Error('Usuário não encontrado');

//     const transactionAmount = product.price / 100;

//     const paymentData = {
//       transaction_amount: transactionAmount,
//       description: product.name_art,
//       payment_method_id: 'pix',
//       payer: {
//         email: userEmail,
//         first_name: 'Cliente',
//         last_name: 'Teste',
//         identification: {
//           type: 'CPF',
//           number: '19119119100', // CPF de teste
//         },
//       },
//     };

//     const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

//     if (!token) {
//       console.error('❌ MERCADO_PAGO_ACCESS_TOKEN não está definido!');
//       throw new Error('Token do Mercado Pago não definido.');
//     }

//     try {
//       console.log('📦 Enviando dados para o Mercado Pago:\n', JSON.stringify(paymentData, null, 2));

//       const response = await fetch('https://api.mercadopago.com/v1/payments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(paymentData),
//       });

//       const text = await response.text();

//       console.log('📨 Resposta crua do Mercado Pago:\n', text);

//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch (e) {
//         console.error('❌ Resposta do Mercado Pago não é JSON válido:\n', text);
//         throw new Error('Resposta inválida do Mercado Pago');
//       }

//       if (!response.ok) {
//         console.error(`❌ Erro ${response.status} na resposta do Mercado Pago:`, result);
//         throw new Error(`Erro ${response.status}: ${result.message || 'Falha ao criar pagamento'}`);
//       }

//       if (
//         !result.point_of_interaction ||
//         !result.point_of_interaction.transaction_data
//       ) {
//         console.error('❌ Resposta inesperada do Mercado Pago:\n', result);
//         throw new Error('Resposta do Mercado Pago não contém dados de Pix');
//       }

//       const order = await prismaClient.order.create({
//         data: {
//           status: 'pending',
//           transaction_id: result.id.toString(),
//           total_amount: transactionAmount,
//           user_client_id: userClient.id,
//           product_id: product.id,
//           user_designer_id: product.designer.id,
//         },
//       });

//       console.log('✅ Pagamento criado com sucesso:', result);

//       return {
//         qr_code: result.point_of_interaction.transaction_data.qr_code,
//         qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
//         copy_paste: result.point_of_interaction.transaction_data.ticket_url,
//         order_id: order.id,
//       };
//     } catch (error: any) {
//       console.error('❌ Erro geral no processo de pagamento:', error);
//       throw new Error('Erro ao processar pagamento PIX');
//     }
//   }
// }


//Versão da Vercel que está online:
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

    //  2. Criar o pagamento via Pix
    const transactionAmount = product.price / 100; // Convertendo centavos para reais

    const paymentData = {
      transaction_amount: product.price / 100,
      description: product.name_art,
      payment_method_id: 'pix',
      payer: { email: userEmail },
      //notification_url: 'https://MEU_DOMINIO/webhook'
    };

    const response = await payment.create({ body: paymentData });

    // 3. Criar o pedido no banco de dados
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