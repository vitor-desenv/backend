import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
//compare da para comparar as senhas criptografada do banco e a senha real.
import { sign } from 'jsonwebtoken';

interface AuthDesignerRequest{
    email: string;
    password: string;
}

class AuthUserDesignerService{
    async execute({ email, password }: AuthDesignerRequest){
        //verificar se o email existe.
        const userDesigner = await prismaClient.userDesigner.findFirst({
            where:{
                email: email
            }
        })

        if(!userDesigner){
            throw new Error("Email/password incorretos!")
        }

        //preciso verificar se a senha que mandou esta correta.
        const passwordMatch = await compare(password, userDesigner.password)

        if(!passwordMatch){
            throw new Error("Email/passoword incorretos!");
        }
        
        // gerar um token JWT e devolver os dados do usuario.
        // se deu tudo certo vamos gerar o token para o designer

        const token = sign(
            {
                name: userDesigner.name,
                email: userDesigner.email
            },
            process.env.JWT_SECRET,
            {
                subject: userDesigner.id,
                expiresIn: '15d'
            }
        )
        return {
            id: userDesigner.id,
            name: userDesigner.name,
            email: userDesigner.email,
            token: token
        };
    }
}

export { AuthUserDesignerService };