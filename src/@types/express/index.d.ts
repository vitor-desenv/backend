declare namespace Express{
    export interface Request{
        user_id: string
        userRole: 'USER' | 'MODERATOR' | 'ADMIN'
    }
}