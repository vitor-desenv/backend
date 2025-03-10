import { Request, Response } from 'express';
import { DetailsUserDesignerService } from '../../services/users/DetailsUserDesignerService';

class DetailsUserDesignerController{
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const  detailsUserDesigner = new DetailsUserDesignerService();

        const userDesigner = await detailsUserDesigner.execute(user_id)

        return res.json(userDesigner);
    }
}

export { DetailsUserDesignerController };