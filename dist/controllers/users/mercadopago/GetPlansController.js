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
exports.GetPlansController = void 0;
const CreatePlansService_1 = require("../../../services/users/mercadopago/CreatePlansService");
class GetPlansController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const plans = yield CreatePlansService_1.CreatePlansService.getAllPlans();
                return res.status(200).json(plans);
            }
            catch (error) {
                console.error(error); // Log para facilitar o debug
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
}
exports.GetPlansController = GetPlansController;
