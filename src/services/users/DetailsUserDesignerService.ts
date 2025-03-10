import prismaClient from "../../prisma";

class DetailsUserDesignerService{
    async execute(user_id: string){

        const userDesigner = await prismaClient.userDesigner.findFirst({
            where: {
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })
        return userDesigner;
    }
}

export { DetailsUserDesignerService };