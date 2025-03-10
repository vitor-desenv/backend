import prismaClient from "../../prisma";

class DetailsUserClientService{
    async execute(user_id: string){

        const userClient = await prismaClient.userClient.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return userClient;
    }
}

export { DetailsUserClientService };