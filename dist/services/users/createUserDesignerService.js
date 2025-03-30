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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDesignerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs"); //hash criptar algo
class CreateUserDesignerService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(name);
            //console.log(email);
            //verificar se ele enviou o email
            if (!email) {
                throw new Error("Email incorreto! É necessario preencher o campo!");
            }
            //verificar se o email já esta cadastrado na plataforma
            const userDesignerAlreadyExists = yield prisma_1.default.userDesigner.findFirst({
                where: {
                    email: email
                }
            });
            //se o email já existe...
            if (userDesignerAlreadyExists) {
                throw new Error("Este usuario já existe, por favor insira outro email valido.");
            }
            //criptografando password
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            //cadastrando no banco de dados
            const userDesigner = yield prisma_1.default.userDesigner.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return { userDesigner };
        });
    }
}
exports.CreateUserDesignerService = CreateUserDesignerService;
