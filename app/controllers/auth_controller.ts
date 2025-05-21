import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    if (!user.active) {
      return response.unauthorized({ message: 'Usuário sem acesso!' })
    }

    const token = await User.accessTokens.create(user)
    return {
      data: token,
      fullName: user.fullName,
      email: user.email,
      admin: user.admin,
    }
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return { message: 'success' }
  }

  async me({ auth }: HttpContext) {
    return {
      user: auth.user,
    }
  }

  async index({ response }: HttpContext) {
    try {
      const users = await User.query().where('admin', 0)
      return users
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async usersnames({ response }: HttpContext) {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}
