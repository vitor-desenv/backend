import prismaClient from '../../prisma';
import { hash } from 'bcryptjs'; //hash criptar algo

interface UserDesignerRequest{
    //informar tipagens
    name: string;
    email: string;
    password: string;
}

class CreateUserDesignerService{
    async execute({name, email, password}: UserDesignerRequest){

        //console.log(name);
        //console.log(email);

        //verificar se ele enviou o email
        if(!email){
            throw new Error("Email incorreto! É necessario preencher o campo!")
        }

        //verificar se o email já esta cadastrado na plataforma
        const userDesignerAlreadyExists = await prismaClient.userDesigner.findFirst({
            where: { //algum parametro para buscar
                email: email
            }
        })
        //se o email já existe...
        if(userDesignerAlreadyExists){
            throw new Error("Este usuario já existe, por favor insira outro email valido.")
        }

        //criptografando password
        const passwordHash = await hash(password, 8)

        //cadastrando no banco de dados
        const userDesigner = await prismaClient.userDesigner.create({
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

        return { userDesigner };
    }
}

export { CreateUserDesignerService }