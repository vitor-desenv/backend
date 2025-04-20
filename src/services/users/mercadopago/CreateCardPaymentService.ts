import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import prismaClient from '../../../prisma/index';

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

interface Payer {
  email: string;
  first_name: string;
  last_name: string;
  identification: {
    type: string;
    number: string;
  };
}

interface CardPaymentRequest {
  transaction_amount: number;
  token: string;
  description: string;
  installments: number;
  payment_method_id: string;
  payer: Payer;
}

export class MercadoPagoService {
  static async createCardPayment(paymentData: CardPaymentRequest) {
    try {
      const response = await fetch('https://api.mercadopago.com/v1/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'X-Idempotency-Key': uuidv4()
        },
        body: JSON.stringify(paymentData)
      });

      const resultText = await response.text();
      let result;

      try {
        result = JSON.parse(resultText);
      } catch (e) {
        throw new Error(`Erro ao interpretar resposta do Mercado Pago: "${resultText}"`);
      }

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${result?.message || 'Erro desconhecido'}`);
      }

      return result;
    } catch (error) {
      throw new Error(`Erro ao criar pagamento: ${error}`);
    }
  }

  static async createSubscription(planId: string, userId: string) {
    const user = await prismaClient.userClient.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Usuário não encontrado');

    const plan = await prismaClient.plan.findUnique({
      where: { id: planId },
      select: { name: true, price: true }
    });

    if (!plan) {
      throw new Error('Plano não encontrado');
    }

    const planPrice = Number(plan.price);

    console.log(`🟢 Criando assinatura para o plano: ${plan.name}`);
    console.log(`💰 Valor do plano: R$ ${plan.price}`);

    try {
      const response = await fetch('https://api.mercadopago.com/preapproval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          back_url: 'http://www.your-site.com/return',
          // notification_url: 'https://backend-topaz-eta-11.vercel.app//webhook',
          reason: `Assinatura do plano ${plan.name}`,
          auto_recurring: {
            frequency: '1',
            frequency_type: 'months',
            transaction_amount: planPrice,
            currency_id: 'BRL',
            start_date: new Date(),
            end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          },
          payer_email: user.email,
          user_id: userId,
          plan_id: planId,
        })
      });

      const resultText = await response.text();
      let result;

      try {
        result = JSON.parse(resultText);
      } catch (e) {
        throw new Error(`Erro ao interpretar resposta do Mercado Pago: "${resultText}"`);
      }

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${result?.message || 'Erro desconhecido'}`);
      }

      console.log(`🔵 Resposta do Mercado Pago:`, result);

      return result;
    } catch (error) {
      throw new Error(`Erro ao criar assinatura: ${error}`);
    }
  }
}

//MODELO QUE ESTA NA VERCEL (ONLINE)
// import fetch from 'node-fetch';
// import { v4 as uuidv4 } from 'uuid';
// import prismaClient from '../../../prisma/index';

// const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

// interface Payer {
//   email: string;
//   first_name: string;
//   last_name: string;
//   identification: {
//     type: string;
//     number: string;
//   };
// }

// interface CardPaymentRequest {
//   transaction_amount: number;
//   token: string;
//   description: string;
//   installments: number;
//   payment_method_id: string;
//   payer: Payer;
// }

// export class MercadoPagoService {
//   static async createCardPayment(paymentData: CardPaymentRequest) {
//     try {
//       const response = await fetch('https://api.mercadopago.com/v1/payments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//           'X-Idempotency-Key': uuidv4()
//         },
//         body: JSON.stringify(paymentData)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(`Erro ${result.status}: ${result.message}`);
//       }

//       return result;
//     } catch (error) {
//       throw new Error(`Erro ao criar pagamento: ${error}`);
//     }
//   }

//   static async createSubscription(planId: string, userId: string) {
//     // Buscando o email do usuário
//     const user = await prismaClient.userClient.findUnique({ where: { id: userId } });
//     if (!user) throw new Error('Usuário não encontrado');

//     const plan = await prismaClient.plan.findUnique({
//       where: { id: planId },
//       select: { name: true, price: true }
//     });
    
//     if (!plan) {
//       throw new Error('Usuário não encontrado');
//     }

//     const planPrice = Number(plan.price);

//       // 📌 Debug: Verificando se os dados do plano estão corretos
//       console.log(`🟢 Criando assinatura para o plano: ${plan.name}`);
//       console.log(`💰 Valor do plano: R$ ${plan.price}`);

//     try {
//       const response = await fetch('https://api.mercadopago.com/preapproval', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           back_url: 'http://www.your-site.com/return', // URL de retorno após a confirmação
//           //notification_url: 'https://backend-topaz-eta-11.vercel.app//webhook',
//           reason: `Assinatura do plano ${plan.name}`,
//           auto_recurring: {
//             frequency: '1', // Frequência da cobrança (1 = mensal)
//             frequency_type: 'months',
//             transaction_amount: planPrice, // Valor da assinatura (substitua com o valor do plano)
//             currency_id: 'BRL',
//             start_date: new Date(),
//             end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Ajuste a data de expiração
//           },
//           payer_email: user.email, // Email do pagador
//           user_id: userId, // ID do usuário
//           plan_id: planId, // ID do plano
//         })
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(`Erro ${result.status}: ${result.message}`);
//       }

//         // 📌 Debug: Verificando resposta do Mercado Pago
//         console.log(`🔵 Resposta do Mercado Pago:`, result);

//       return result; // Retorna os dados da assinatura criada
//     } catch (error) {
//       throw new Error(`Erro ao criar assinatura: ${error}`);
//     }
//   }
// }

// ------------------------------> ANTES DA ATUALIZAÇÃO DAS ASSINATURAS DO MERCADO PAGO <-----------------------------------//
// import fetch from 'node-fetch';
// import { v4 as uuidv4 } from 'uuid';

// const accessToken = 'TEST-7126931419506998-020211-d0ab193bc4e96e058659224d3729c28a-2247024662';

// interface Payer {
//   email: string;
//   first_name: string;
//   last_name: string;
//   identification: {
//     type: string;
//     number: string;
//   };
// }

// interface CardPaymentRequest {
//   transaction_amount: number;
//   token: string;
//   description: string;
//   installments: number;
//   payment_method_id: string;
//   payer: Payer;
// }

// export class MercadoPagoService {
//   static async createCardPayment(paymentData: CardPaymentRequest) {
//     try {
//       const response = await fetch('https://api.mercadopago.com/v1/payments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//           'X-Idempotency-Key': uuidv4()
//         },
//         body: JSON.stringify(paymentData)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(`Erro ${result.status}: ${result.message}`);
//       }

//       return result;
//     } catch (error) {
//       throw new Error(`Erro ao criar pagamento: ${error}`);
//     }
//   }

//   static async createSubscription(planId: string, userId: string) {
//     try {
//       // Aqui você vai criar a assinatura no Mercado Pago
//       const response = await fetch('https://api.mercadopago.com/preapproval', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({
//           back_url: 'http://www.your-site.com/return', // URL de retorno após a confirmação
//           reason: 'Assinatura de plano',
//           auto_recurring: {
//             frequency: '1', // Frequência da cobrança (1 = mensal)
//             frequency_type: 'months',
//             transaction_amount: 29.99, // Valor da assinatura (utilize o valor do plano aqui)
//             currency_id: 'BRL',
//             start_date: new Date(),
//             end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), // Ajuste a data de expiração
//           },
//           payer_email: 'payer@example.com', // Email do pagador
//           user_id: userId, // ID do usuário
//           plan_id: planId, // ID do plano
//         })
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(`Erro ${result.status}: ${result.message}`);
//       }

//       return result; // Retorna os dados da assinatura criada
//     } catch (error) {
//       throw new Error(`Erro ao criar assinatura: ${error}`);
//     }
//   }
// }

// ------------------------------> ANTES DA ATUALIZAÇÃO DAS TABELAS PLANOS <-----------------------------------//
// import fetch from 'node-fetch';
// import { v4 as uuidv4 } from 'uuid';

// const accessToken = 'TEST-7126931419506998-020211-d0ab193bc4e96e058659224d3729c28a-2247024662';

// interface Payer {
//   email: string;
//   first_name: string;
//   last_name: string;
//   identification: {
//     type: string;
//     number: string;
//   };
// }

// interface CardPaymentRequest {
//   transaction_amount: number;
//   token: string;
//   description: string;
//   installments: number;
//   payment_method_id: string;
//   payer: Payer;
// }

// export class MercadoPagoService {
//   static async createCardPayment(paymentData: CardPaymentRequest) {
//     try {
//       const response = await fetch('https://api.mercadopago.com/v1/payments', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//           'X-Idempotency-Key': uuidv4()
//         },
//         body: JSON.stringify(paymentData)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(`Erro ${result.status}: ${result.message}`);
//       }

//       return result;
//     } catch (error) {
//       throw new Error(`Erro ao criar pagamento: ${error}`);
//     }
//   }
// }