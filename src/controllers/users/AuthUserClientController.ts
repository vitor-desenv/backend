import { Request, Response } from 'express';
import { AuthUserClientService } from '../../services/users/AuthUserClientService';

class AuthUserClientController{
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authClient = new AuthUserClientService();

        const auth = await authClient.execute({
            email,
            password,
        })

        return res.json(auth);
    }
}

export { AuthUserClientController };