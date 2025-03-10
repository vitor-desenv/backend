import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

//receber os dados pela função execute

interface UserClientRequest{
    //informar tipagens
    name: string;
    email: string;
    password: string;
}

class CreateUserClientService{
    async execute({name, email, password}: UserClientRequest){
        
        //verificar se ele enviou o email
        if(!email){
            throw new Error("Email incorreto! É necessario preencher o campo!")
        }

        //verificar se o email já esta cadastrado na plataforma
        const userClientAlreadyExists = await prismaClient.userDesigner.findFirst({
            where: { //algum parametro para buscar
                email: email
            }
        })
        //se o email já existe...
        if(userClientAlreadyExists){
            throw new Error("Este usuario já existe, por favor insira outro email valido.")
        }

        //criptografando password
        const passwordHash = await hash(password, 8)

        //cadastrando no banco de dados
        const userClient = await prismaClient.userClient.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{ //select = oque eu quero devolver na requisição?
                id: true,
                name: true,
                email: true,
            }
        })

        return { userClient };

    }
}

export { CreateUserClientService }