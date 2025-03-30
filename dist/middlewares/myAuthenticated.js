"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function myAuthenticated(req, res, next) {
    // Receber token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ");
    try {
        // Validar token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // Recuperar o ID do token e armazená-lo na requisição
        req.user_id = sub;
        return next();
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.myAuthenticated = myAuthenticated;
