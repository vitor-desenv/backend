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
exports.AuthUserDesignerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
//compare da para comparar as senhas criptografada do banco e a senha real.
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserDesignerService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            //verificar se o email existe.
            const userDesigner = yield prisma_1.default.userDesigner.findFirst({
                where: {
                    email: email
                }
            });
            if (!userDesigner) {
                throw new Error("Email/password incorretos!");
            }
            //preciso verificar se a senha que mandou esta correta.
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, userDesigner.password);
            if (!passwordMatch) {
                throw new Error("Email/passoword incorretos!");
            }
            // gerar um token JWT e devolver os dados do usuario.
            // se deu tudo certo vamos gerar o token para o designer
            const token = (0, jsonwebtoken_1.sign)({
                name: userDesigner.name,
                email: userDesigner.email
            }, process.env.JWT_SECRET, {
                subject: userDesigner.id,
                expiresIn: '15d'
            });
            return {
                id: userDesigner.id,
                name: userDesigner.name,
                email: userDesigner.email,
                token: token
            };
        });
    }
}
exports.AuthUserDesignerService = AuthUserDesignerService;
