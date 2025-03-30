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
exports.AuthUserClientService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserClientService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se o email já existe
            const userClient = yield prisma_1.default.userClient.findFirst({
                where: {
                    email: email
                }
            });
            if (!userClient) {
                throw new Error("Email/password incorretos");
            }
            // verificar se a senha está correta
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, userClient.password);
            if (!passwordMatch) {
                throw new Error("Email/password incorretos!");
            }
            // gerar um token JWT e devolver os dados do usuario.
            // se deu tudo certo vamos gerar o token para o cliente
            const token = (0, jsonwebtoken_1.sign)({
                name: userClient.name,
                email: userClient.email
            }, process.env.JWT_SECRET, {
                subject: userClient.id,
                expiresIn: '15d'
            });
            return {
                id: userClient.id,
                name: userClient.name,
                email: userClient.email,
                token: token
            };
        });
    }
}
exports.AuthUserClientService = AuthUserClientService;
