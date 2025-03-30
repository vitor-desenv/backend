import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';
import fileupload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload({
    limits: { fieldSize: 50 * 1024 * 1024 } // No maximo 50mb
}))
app.use(router);

// Acesso url da imagem ex: localhost:3333/files/nome-imagem.png
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

//middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
    //verificar se está passando dentro de uma rota é do tipo error.
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    //se não for do tipo instace error
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(process.env.PORT, ()=> console.log('Servidor online com sucesso!'));
//export default app;