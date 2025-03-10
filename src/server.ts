import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors())

app.use(router);

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

app.listen(3333, ()=> console.log('Servidor online com sucesso!'));