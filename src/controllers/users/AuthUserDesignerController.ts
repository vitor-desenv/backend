import { Request, Response } from 'express';
import { AuthUserDesignerService } from '../../services/users/AuthUserDesignerService';

class AuthUserDesignerController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authDesigner = new AuthUserDesignerService();
        
        const auth = await authDesigner.execute({
            email,
            password,
        })

        return res.json(auth);
    }
}

export { AuthUserDesignerController }