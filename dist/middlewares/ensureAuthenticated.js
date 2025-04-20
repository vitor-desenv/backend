"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const myAuthenticated_1 = require("./myAuthenticated");
function ensureAuthenticated(requiredRole) {
    return (req, res, next) => {
        // Primeiro, chama o middleware de autenticação para validar o JWT
        (0, myAuthenticated_1.myAuthenticated)(req, res, () => {
            // Depois de garantir que o JWT é válido, verificar a role do usuário
            const userRole = req.userRole; // assumindo que a role do usuário está na requisição
            if (!userRole) {
                return res.status(401).json({ error: 'Role do usuário não definida' });
            }
            // Verifica se o usuário tem a role necessária
            if (userRole !== requiredRole && userRole !== 'ADMIN') {
                return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' });
            }
            return next();
        });
    };
}
exports.ensureAuthenticated = ensureAuthenticated;
