import prismaClient from "../../../prisma";

interface CreateProductRequest {
    name_art: string;
    price: number; // Recebe o preço já convertido em centavos
    banner: string;
    category_id: string;
    designer_id: string;
}

class CreateProductService {
    async execute({ name_art, price, banner, category_id, designer_id }: CreateProductRequest) {
        const product = await prismaClient.postDesignerProduct.create({
            data: {
                name_art,
                price, // Já vem em centavos do Controller
                banner,
                category_id,
                designer_id,
            },
            select: {
                name_art: true,
                price: true,
                banner: true,
                category_id: true,
                designer_id: true,
            }
        });

        return {
            ...product,
            price: product.price / 100 // Convertendo de centavos para reais na resposta
        };
    }
}

export { CreateProductService };