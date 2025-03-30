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
exports.CreateUserClientController = void 0;
const createUserClientService_1 = require("../../services/users/createUserClientService");
class CreateUserClientController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //acessando dados reais através do req
            //console.log(req.body) a mostra no cmd
            //desconstruindo
            const { name, email, password } = req.body;
            const createUserClienteService = new createUserClientService_1.CreateUserClientService();
            const userClient = yield createUserClienteService.execute({ name, email, password });
            return res.json(userClient);
        });
    }
}
exports.CreateUserClientController = CreateUserClientController;
