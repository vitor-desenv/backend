import prismaClient from "../../../prisma";

export class PromoteUserService {
  async execute(userId: string, newRole: 'MODERATOR' | 'ADMIN') {
    const user = await prismaClient.userDesigner.findUnique({
      where: { id: userId },
    })

    if (!user) throw new Error('Usuário não encontrado')
    if (user.type !== 'DEVELOPER') throw new Error('Apenas desenvolvedores podem ser promovidos')
    if (user.role === newRole) throw new Error('Usuário já possui essa função')

    const updatedUser = await prismaClient.userDesigner.update({
      where: { id: userId },
      data: { role: newRole },
    })

    return updatedUser
  }
}
