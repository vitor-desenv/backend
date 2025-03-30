import prismaClient from '../../../prisma/index';

export class GetProductsService {
    static async getProducts(){
        try{
            return await prismaClient.postDesignerProduct.findMany()
        }catch (error){
            throw new Error('Erro ao buscar os produtos existentes...');
        }
    }
}