import { Request, Response } from 'express';
import { CreateUserClientService } from '../../services/users/createUserClientService'; 

class CreateUserClientController{
    async handle(req: Request, res: Response){

        //acessando dados reais através do req
        //console.log(req.body) a mostra no cmd

        //desconstruindo
        const { name, email, password } = req.body;

        const createUserClienteService = new CreateUserClientService();

        const userClient = await createUserClienteService.execute({name, email, password});

        return res.json(userClient);
    }
}

export { CreateUserClientController }