import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CreatePlansService {
  static async createPlan(name: string, price: number, tag: string, benefits: string, maxDownloads: number) {
    try {
      // Criando o plano no banco de dados
      const plan = await prisma.plan.create({
        data: { name, price, tag, benefits, maxDownloads }
      });

      return plan;
    } catch (error) {
      throw new Error('Erro ao criar plano');
    }
  }

  static async getAllPlans() {
    try {
      // Buscando todos os planos
      return await prisma.plan.findMany();
    } catch (error) {
      throw new Error('Erro ao buscar planos');
    }
  }
}