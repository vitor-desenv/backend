import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface PayLoad {
    sub: string;  // `sub` é o ID do usuário
    role: 'USER' | 'MODERATOR' | 'ADMIN'  // Adicionando a role no payload
}

// Estendendo o Request para adicionar o user_id e userRole
declare module "express-serve-static-core" {
    interface Request {
        user_id?: string;
        userRole?: 'USER' | 'MODERATOR' | 'ADMIN';  // Adicionando a role na requisição
    }
}

export function myAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    // Receber o token da requisição
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar o token
        const { sub, role } = verify(token, process.env.JWT_SECRET) as PayLoad

        // Recuperar o ID e a role do token e armazená-los na requisição
        req.user_id = sub
        req.userRole = role

        return next()
    } catch (error) {
        return res.status(401).end()
    }
}



// -------------------------> ANTES DA ATT DOS MODERADORES E ADMINISTRADORES <----------------------------------------\\
// import { Request, Response, NextFunction } from 'express';
// import { verify } from 'jsonwebtoken';

// interface PayLoad {
//     sub: string; // `sub` é o ID do usuário
// }

// // Estendendo o Request para adicionar o user_id
// declare module "express-serve-static-core" {
//     interface Request {
//         user_id?: string;
//     }
// }

// export function myAuthenticated(
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     // Receber token
//     const authToken = req.headers.authorization;

//     if (!authToken) {
//         return res.status(401).end();
//     }

//     const [, token] = authToken.split(" ");

//     try {
//         // Validar token
//         const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

//         // Recuperar o ID do token e armazená-lo na requisição
//         req.user_id = sub;

//         return next();
//     } catch (error) {
//         return res.status(401).end();
//     }
// }
