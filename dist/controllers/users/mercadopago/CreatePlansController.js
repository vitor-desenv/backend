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
exports.GetPlansController = exports.CreatePlansController = void 0;
const CreatePlansService_1 = require("../../../services/users/mercadopago/CreatePlansService");
class CreatePlansController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, tag, benefits, maxDownloads } = req.body;
            try {
                // Validação de campos obrigatórios
                if (!name || !price || !tag || !benefits || !maxDownloads) {
                    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
                }
                // Chamando o serviço para criar o plano
                const plan = yield CreatePlansService_1.CreatePlansService.createPlan(name, price, tag, benefits, maxDownloads);
                return res.status(201).json(plan);
            }
            catch (error) {
                console.error(error); // Importante para facilitar o debug
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
}
exports.CreatePlansController = CreatePlansController;
class GetPlansController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plans = yield CreatePlansService_1.CreatePlansService.getAllPlans();
                return res.status(200).json(plans);
            }
            catch (error) {
                console.error(error); // Importante para facilitar o debug
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
}
exports.GetPlansController = GetPlansController;
