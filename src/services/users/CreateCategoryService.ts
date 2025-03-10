import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){

        //Não permitindo nome vazio.
        if(name === ''){
            throw new Error("Nome invalido para categoria")
        }

        //Verificando se existe categoria duplicado no banco.
        const categoryAlreadyExist = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        //Aplicando o erro.
        if(categoryAlreadyExist){
            throw new Error("Essa categoria já existe")
        }

        //Cadastrando categoria.
        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export { CreateCategoryService };