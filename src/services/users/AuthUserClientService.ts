import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthClientRequest{
    email: string;
    password: string;
}

class AuthUserClientService{
    async execute({email, password}: AuthClientRequest){
        // verificar se o email já existe
        const userClient = await prismaClient.userClient.findFirst({
            where: {
            email: email
        }
    });

    if (!userClient) {
        throw new Error("Email/password incorretos");
    }

    // verificar se a senha está correta
    const passwordMatch = await compare(password, userClient.password);

    if (!passwordMatch) {
        throw new Error("Email/password incorretos!");
    }

        // gerar um token JWT e devolver os dados do usuario.
        // se deu tudo certo vamos gerar o token para o cliente

        const token = sign(
            {
                name: userClient.name,
                email: userClient.email
            },
            process.env.JWT_SECRET,
            {
                subject: userClient.id,
                expiresIn: '15d'
            })

            return {
                id: userClient.id,
                name: userClient.name,
                email: userClient.email,
                token: token
            };
    }
}

export { AuthUserClientService };