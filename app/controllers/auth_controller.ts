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

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return {
      data: token,
      fullName: user.fullName,
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
}
