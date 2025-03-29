import { Request, Response } from 'express';
import { CreateProductService } from '../../../services/users/produtos/CreateProductService';
import { UploadedFile } from 'express-fileupload';

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name_art, price, category_id } = req.body;
        const designer_id = req.user_id;

        if (!designer_id) {
            return res.status(401).json({ error: "Usuário não autenticado" });
        }

        //UTILIZANDO O MULTER
        // if (!req.file) {
        //     return res.status(400).json({ error: "Erro, é obrigatório carregar a imagem" });
        // }

        //const { filename: banner } = req.file;

        //Utilizando "Cloudinary"
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "Erro, é obrigatório carregar a imagem" });
        }

        const file: UploadedFile = req.files['file']

        const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, function (error, result){
                if(error){
                    reject(error);
                    return; //parando execução.
                }

                resolve(result)
            }).end(file.data)
        })

        // Validação e conversão do preço para centavos
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({ error: "Preço inválido" });
        }
        const priceInCents = Math.round(parsedPrice * 100); // Converte para centavos

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name_art,
            price: priceInCents, // Agora enviamos um inteiro para o Service
            banner: resultFile.url,
            category_id,
            designer_id
        });

        return res.json(product);
    }
}

export { CreateProductController };
