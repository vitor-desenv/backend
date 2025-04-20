import { Request, Response, NextFunction } from 'express'
import { myAuthenticated } from './myAuthenticated'

export function ensureAuthenticated(requiredRole: 'USER' | 'MODERATOR' | 'ADMIN') {
  return (req: Request, res: Response, next: NextFunction) => {
    // Primeiro, chama o middleware de autenticação para validar o JWT
    myAuthenticated(req, res, () => {
      // Depois de garantir que o JWT é válido, verificar a role do usuário
      const userRole = req.userRole // assumindo que a role do usuário está na requisição

      if (!userRole) {
        return res.status(401).json({ error: 'Role do usuário não definida' })
      }

      // Verifica se o usuário tem a role necessária
      if (userRole !== requiredRole && userRole !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso negado. Permissão insuficiente.' })
      }

      return next()
    })
  }
}
