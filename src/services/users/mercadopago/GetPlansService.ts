import prismaClient from '../../../prisma/index';

export class GetPlansService {
  static async getAllPlans() {
    try {
      // Buscando todos os planos no banco de dados usando a instância do Prisma
      return await prismaClient.plan.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar planos');
    }
  }
}