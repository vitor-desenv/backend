"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fieldSize: 50 * 1024 * 1024 } // No maximo 50mb
}));
app.use(routes_1.router);
// Acesso url da imagem ex: localhost:3333/files/nome-imagem.png
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
//middleware
app.use((err, req, res, next) => {
    //verificar se está passando dentro de uma rota é do tipo error.
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    //se não for do tipo instace error
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
app.listen(process.env.PORT, () => console.log('Servidor online com sucesso!'));
