import prismaClient from '../../prisma';

export class DeleteUserService {
    static async deleteUser(userId: string) {
        try {
            // Verifica se o usuário existe e a qual tabela pertence
            const userDesigner = await prismaClient.userDesigner.findUnique({
                where: { id: userId }
            });

            const userClient = await prismaClient.userClient.findUnique({
                where: { id: userId }
            });

            if (!userDesigner && !userClient) {
                throw new Error('Usuário não encontrado.');
            }

            // Se for um designer precisamos excluir os posts antes
            if (userDesigner) {
                await prismaClient.postDesignerProduct.deleteMany({
                    where: { designer_id: userId }
                });

                await prismaClient.userDesigner.delete({
                    where: { id: userId }
                });
            }

            // Se for um cliente, apenas vamos deletar o usuário
            if (userClient) {
                await prismaClient.userClient.delete({
                    where: { id: userId }
                });
            }

            return { message: 'Usuário excluído com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao excluir o usuário: ' + error.message);
        }
    }
}
