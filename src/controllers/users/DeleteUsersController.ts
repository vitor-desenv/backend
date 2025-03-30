import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/DeleteUsersService';

export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const result = await DeleteUserService.deleteUser(userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir o usuário!', details: error.message });
        }
    }
}
