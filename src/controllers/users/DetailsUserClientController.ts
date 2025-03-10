import { Request, Response, } from 'express';
import { DetailsUserClientService } from '../../services/users/DetailsUserClientService';

class DetailsUserClientController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const detailsUserClient = new DetailsUserClientService();

        const userClient = await detailsUserClient.execute(user_id)

        return res.json(userClient);

    }
}

export { DetailsUserClientController };