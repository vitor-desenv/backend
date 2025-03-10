import prismaClient from "../../../prisma";

//pegar dados do cliente: id, nome, email ,cpf, telefone, endereço e dataNascimento

//if cartão de crédito || débito || PIX: Vamos deixar essa ferramenta por ultimo


interface DadosRequest{
    id: string;
    name: string;
    email: string;
    cpf: string;
    telefone: number;
    endereco: string;
    dataNascimento: number;
}

class BuyProductService{
    async execute({id, name, email, cpf, telefone, endereco, dataNascimento}: DadosRequest){
        //após criar migration com esses dados novos, podemos recuperar estes dados
        // const dados = prismaClient.userClient.
    }
}

export { BuyProductService }