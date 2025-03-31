import { HttpContext } from '@adonisjs/core/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const user = await ctx.auth.authenticate()

    if (!user.admin) {
      return ctx.response.unauthorized({
        message: 'Acesso negado. Apenas administradores podem acessar.',
      })
    }

    await next()
  }
}
