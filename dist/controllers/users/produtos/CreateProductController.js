"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../../services/users/produtos/CreateProductService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateProductController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const file = req.files['file'];
            const resultFile = yield new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                    if (error) {
                        reject(error);
                        return; //parando execução.
                    }
                    resolve(result);
                }).end(file.data);
            });
            // Validação e conversão do preço para centavos
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return res.status(400).json({ error: "Preço inválido" });
            }
            const priceInCents = Math.round(parsedPrice * 100); // Converte para centavos
            const createProductService = new CreateProductService_1.CreateProductService();
            const product = yield createProductService.execute({
                name_art,
                price: priceInCents, // Agora enviamos um inteiro para o Service
                banner: resultFile.url,
                category_id,
                designer_id
            });
            return res.json(product);
        });
    }
}
exports.CreateProductController = CreateProductController;
