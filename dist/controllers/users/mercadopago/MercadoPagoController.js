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
exports.MercadoPagoController = void 0;
const MercadoPagoService_1 = require("../../../services/users/mercadopago/MercadoPagoService");
class MercadoPagoController {
    static callback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, payment_id, external_reference } = req.query;
                console.log('Callback recebido:', req.query);
                if (status === 'approved' && payment_id && external_reference) {
                    yield MercadoPagoService_1.MercadoPagoService.updateUserSubscription(String(external_reference));
                    return res.json({ message: 'Assinatura confirmada!', paymentId: payment_id });
                }
                return res.status(400).json({ error: 'Pagamento não aprovado ou pendente' });
            }
            catch (error) {
                console.error('Erro no callback:', error);
                return res.status(500).json({ error: 'Erro interno no servidor' });
            }
        });
    }
    static webhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Webhook recebido:', req.body);
                const { action, data } = req.body;
                if ((action === 'payment.created' || action === 'payment.updated') && data.id) {
                    const paymentData = yield MercadoPagoService_1.MercadoPagoService.processPayment(String(data.id));
                    if (paymentData.status === 'approved') {
                        yield MercadoPagoService_1.MercadoPagoService.updateUserSubscription(paymentData.external_reference);
                    }
                }
                return res.sendStatus(200);
            }
            catch (error) {
                console.error('Erro no webhook:', error);
                return res.status(500).json({ error: 'Erro interno' });
            }
        });
    }
}
exports.MercadoPagoController = MercadoPagoController;
