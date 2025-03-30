import prismaClient from '../../../prisma';

export class DeleteProductService {
    static async deleteProduct(id: string) {
        try {
            // Verifique se o id está sendo passado corretamente
            console.log("Tentando excluir produto com id:", id);

            return await prismaClient.postDesignerProduct.delete({
                where: {
                    id: id,  // Passando o id correto
                },
            });
        } catch (error) {
            console.error("Erro ao excluir o produto:", error);  // Logando o erro
            throw new Error('Erro ao excluir o produto: ' + error.message);
        }
    }
}
