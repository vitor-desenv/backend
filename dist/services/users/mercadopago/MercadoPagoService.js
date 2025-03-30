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
exports.MercadoPagoService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const index_1 = __importDefault(require("../../../prisma/index"));
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
class MercadoPagoService {
    static processPayment(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, node_fetch_1.default)(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const paymentData = yield response.json();
                if (!response.ok) {
                    throw new Error(`Erro ao buscar pagamento: ${paymentData.message}`);
                }
                return paymentData;
            }
            catch (error) {
                console.error('Erro ao processar pagamento:', error);
                throw new Error('Erro ao processar pagamento');
            }
        });
    }
    static updateUserSubscription(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.default.userClient.update({
                    where: { id: userId },
                    data: { status: 'active' },
                });
            }
            catch (error) {
                console.error('Erro ao atualizar assinatura do usuário:', error);
                throw new Error('Erro ao atualizar assinatura');
            }
        });
    }
}
exports.MercadoPagoService = MercadoPagoService;
