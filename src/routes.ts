import {Router} from 'express';
import { Request, Response } from 'express';

//import multer from 'multer';

import uploadConfig from './config/multer';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

import { myAuthenticated } from './middlewares/myAuthenticated';

import { CreateUserClientController } from './controllers/users/createUserClientController';
import { CreateUserDesignerController } from './controllers/users/createUserDesignerController';
import { DeleteUserController } from './controllers/users/DeleteUsersController';

import { AuthUserClientController } from './controllers/users/AuthUserClientController';
import { AuthUserDesignerController } from './controllers/users/AuthUserDesignerController';

import { PromoteUserController } from './controllers/moderador/PromoteUserController';

import { DetailsUserClientController } from './controllers/users/DetailsUserClientController';
import { DetailsUserDesignerController } from './controllers/users/DetailsUserDesignerController';

import { CreateCategoryController } from './controllers/users/CreateCategoryController';
import { ListCategoryController } from './controllers/users/ListCategoryController';

import { CreateProductController } from './controllers/users/produtos/CreateProductController';
import { GetProductsController } from './controllers/users/produtos/GetProductsController';
import { DeleteProductController } from './controllers/users/produtos/DeleteProductController';

//import { CreatePixPaymentController } from '../src/controllers/users/mercadopago/CreatePixPaymentController';
import { CreatePixPaymentController } from './controllers/users/mercadopago/CreatePixPaymentController';
import { CreateCardPaymentController } from './controllers/users/mercadopago/CreateCardPaymentController';

import { CreatePlansController } from './controllers/users/mercadopago/CreatePlansController';
import { GetPlansController } from './controllers/users/mercadopago/GetPlansController';
import { MercadoPagoController } from './controllers/users/mercadopago/MercadoPagoController';
import prismaClient from './prisma';

const router = Router();

//const upload = multer(uploadConfig.upload("./tmp"));

// ------------------------ ROTAS DE PAGAMENTOS ----------------------------------- //

//Quando clicar em comprar algum produto:
router.post('/payments/pix', myAuthenticated, new CreatePixPaymentController().handle);
router.post('/payments/card', myAuthenticated, new CreateCardPaymentController().handle);

// Rota para criar um novo plano
router.post('/plans', myAuthenticated, new CreatePlansController().handle);

// Rota para obter todos os planos
router.get('/plans', myAuthenticated, new GetPlansController().handle);

//Verificando assinatura de pagamento = DEU CERTO PORÉM PRECISO MOSTRAR NO BANCO DE DADOS O TIPO DE ASSINATURA
router.get('/mercadopago/callback', MercadoPagoController.callback);
router.post('/mercadopago/webhook', MercadoPagoController.webhook);

// ------------------------ ROTAS USERS ----------------------------------- //

//post significa que eu quero cadastrar um usuario (criar).
router.post('/userClient', new CreateUserClientController().handle )
router.post('/userDesigner', new CreateUserDesignerController().handle )

//Deletando qualquer usuario (Cliente & Designer)
router.delete('/user/:userId', myAuthenticated, new DeleteUserController().handle);

//logando users.
router.post('/sessionClient', new AuthUserClientController().handle )
router.post('/sessionDesigner', new AuthUserDesignerController().handle )

//Middlewares para validar que acesse rotas privadas e paginas com detalhes do usuario.
router.get('/myClient', myAuthenticated, async (req: Request, res: Response) => {
    try {
        // Acesso ao usuário logado com base no ID extraído do token
        const user = await prismaClient.userClient.findUnique({
            where: { id: req.user_id },  // usa o ID do usuário que foi armazenado no middleware
        })

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        return res.json(user)  // Retorna os dados do usuário logado
    } catch (err) {
        return res.status(500).json({ message: 'Erro interno' })
    }
})
//router.get('/myDesigner', myAuthenticated, new DetailsUserDesignerController().handle )

// Rota para promover um usuário
router.patch('/userDesigner/:userId/promote', ensureAuthenticated('ADMIN'), new PromoteUserController().handle);

// ------------------------ ROTAS CATEGORIAS  ----------------------------------- //
router.post('/category', myAuthenticated, new CreateCategoryController().handle )
//lista das categorias:
router.get('/category', myAuthenticated, new ListCategoryController().handle )

// ------------------------ ROTAS PRODUTOS  ----------------------------------- //

//router.post('/product', myAuthenticated, upload.single('file'), new CreateProductController().handle ) UTILIZANDO O MULTER
router.post('/product', myAuthenticated, new CreateProductController().handle )
router.get('/products', new GetProductsController().handle);
router.delete('/product/:productId', myAuthenticated, new DeleteProductController().handle);

export { router };