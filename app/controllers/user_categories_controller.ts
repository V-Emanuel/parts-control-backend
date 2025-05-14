import Category from '#models/category'
import UserCategory from '#models/user_category'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserCategoriesController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (user.admin) {
        const categories = await Category.all()
        return response.json(categories)
      }

      const userCategories = await UserCategory.query()
        .where('user_id', user.id)
        .preload('category')

      const categories = userCategories.map((uc) => uc.category)
      return response.json(categories)
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }

  async store({ request, auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (!user.admin) {
        return response.unauthorized({ message: 'Permissão apenas para administradores.' })
      }

      const { userId, categoryId } = request.only(['userId', 'categoryId'])

      const userCategory = await UserCategory.create({ userId, categoryId })

      return response.status(201).json(userCategory)
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (!user.admin) {
        return response.unauthorized({ message: 'Permissão apenas para administradores.' })
      }

      const userCategory = await UserCategory.find(params.id)

      if (!userCategory) {
        return response.notFound({ message: 'Usuário não encontrado.' })
      }

      await userCategory.delete()
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }
}
