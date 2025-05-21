import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserCategory from '#models/user_category'
import UserCompany from '#models/user_company'

export default class UsersController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    if (!user.admin) {
      return response.status(403).json({ error: 'Unauthorized' })
    }

    const users = await User.all()

    const userCategories = await UserCategory.query().preload('category')
    const userCompanies = await UserCompany.query().preload('company')

    const result = users.map((u) => {
      const categories = userCategories.filter((uc) => uc.userId === u.id).map((uc) => uc.category)

      const companies = userCompanies.filter((uc) => uc.userId === u.id).map((uc) => uc.company)

      return {
        ...u.serialize(),
        categories,
        companies,
      }
    })

    return response.json(result)
  }
}
