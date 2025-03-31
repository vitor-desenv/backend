"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const myAuthenticated_1 = require("./middlewares/myAuthenticated");
const createUserClientController_1 = require("./controllers/users/createUserClientController");
const createUserDesignerController_1 = require("./controllers/users/createUserDesignerController");
const DeleteUsersController_1 = require("./controllers/users/DeleteUsersController");
const AuthUserClientController_1 = require("./controllers/users/AuthUserClientController");
const AuthUserDesignerController_1 = require("./controllers/users/AuthUserDesignerController");
const DetailsUserClientController_1 = require("./controllers/users/DetailsUserClientController");
const DetailsUserDesignerController_1 = require("./controllers/users/DetailsUserDesignerController");
const CreateCategoryController_1 = require("./controllers/users/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/users/ListCategoryController");
const CreateProductController_1 = require("./controllers/users/produtos/CreateProductController");
const GetProductsController_1 = require("./controllers/users/produtos/GetProductsController");
const DeleteProductController_1 = require("./controllers/users/produtos/DeleteProductController");
//import { CreatePixPaymentController } from '../src/controllers/users/mercadopago/CreatePixPaymentController';
const CreatePixPaymentController_1 = require("./controllers/users/mercadopago/CreatePixPaymentController");
const CreateCardPaymentController_1 = require("./controllers/users/mercadopago/CreateCardPaymentController");
const CreatePlansController_1 = require("./controllers/users/mercadopago/CreatePlansController");
const GetPlansController_1 = require("./controllers/users/mercadopago/GetPlansController");
const MercadoPagoController_1 = require("./controllers/users/mercadopago/MercadoPagoController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// ------------------------ ROTAS DE PAGAMENTOS ----------------------------------- //
//Quando clicar em comprar algum produto:
router.post('/payments/pix', myAuthenticated_1.myAuthenticated, new CreatePixPaymentController_1.CreatePixPaymentController().handle);
router.post('/payments/card', myAuthenticated_1.myAuthenticated, new CreateCardPaymentController_1.CreateCardPaymentController().handle);
// Rota para criar um novo plano
router.post('/plans', myAuthenticated_1.myAuthenticated, new CreatePlansController_1.CreatePlansController().handle);
// Rota para obter todos os planos
router.get('/plans', myAuthenticated_1.myAuthenticated, new GetPlansController_1.GetPlansController().handle);
//Verificando assinatura de pagamento = DEU CERTO PORÉM PRECISO MOSTRAR NO BANCO DE DADOS O TIPO DE ASSINATURA
router.get('/mercadopago/callback', MercadoPagoController_1.MercadoPagoController.callback);
router.post('/mercadopago/webhook', MercadoPagoController_1.MercadoPagoController.webhook);
// ------------------------ ROTAS USERS ----------------------------------- //
//post significa que eu quero cadastrar um usuario (criar).
router.post('/userClient', new createUserClientController_1.CreateUserClientController().handle);
router.post('/userDesigner', new createUserDesignerController_1.CreateUserDesignerController().handle);
//Deletando qualquer usuario (Cliente & Designer)
router.delete('/user/:userId', myAuthenticated_1.myAuthenticated, new DeleteUsersController_1.DeleteUserController().handle);
//logando users.
router.post('/sessionClient', new AuthUserClientController_1.AuthUserClientController().handle);
router.post('/sessionDesigner', new AuthUserDesignerController_1.AuthUserDesignerController().handle);
//Middlewares para validar que acesse rotas privadas e paginas com detalhes do usuario.
router.get('/meClient', myAuthenticated_1.myAuthenticated, new DetailsUserClientController_1.DetailsUserClientController().handle);
router.get('/meDesigner', myAuthenticated_1.myAuthenticated, new DetailsUserDesignerController_1.DetailsUserDesignerController().handle);
// ------------------------ ROTAS CATEGORIAS  ----------------------------------- //
router.post('/category', myAuthenticated_1.myAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
//lista das categorias:
router.get('/category', myAuthenticated_1.myAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// ------------------------ ROTAS PRODUTOS  ----------------------------------- //
//router.post('/product', myAuthenticated, upload.single('file'), new CreateProductController().handle ) UTILIZANDO O MULTER
router.post('/product', myAuthenticated_1.myAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/products', new GetProductsController_1.GetProductsController().handle);
router.delete('/product/:productId', myAuthenticated_1.myAuthenticated, new DeleteProductController_1.DeleteProductController().handle);
