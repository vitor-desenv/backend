import { Request, Response } from 'express';
import { CreateUserDesignerService } from '../../services/users/createUserDesignerService';

class CreateUserDesignerController{
    async handle(req: Request, res: Response){

        const { name, email, password } = req.body;

        const createUserDesignerService = new CreateUserDesignerService();

        const userDesigner = await createUserDesignerService.execute({name, email, password});

        return res.json(userDesigner);

    }
}

export { CreateUserDesignerController }