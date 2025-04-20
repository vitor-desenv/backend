import { Request, Response } from "express";
import { PromoteUserService } from "../../services/users/moderador/PromoteUserService";

export class PromoteUserController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params
    const { newRole } = req.body

    if (req.userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Apenas administradores podem promover usuários.' })
    }

    if (!['MODERATOR', 'ADMIN'].includes(newRole)) {
      return res.status(400).json({ error: 'Função inválida' })
    }

    const service = new PromoteUserService()

    try {
      const result = await service.execute(userId, newRole)
      return res.json(result)
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
