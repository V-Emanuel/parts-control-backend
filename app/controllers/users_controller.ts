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

  async show({ auth, response, params }: HttpContext) {
    const requestingUser = await auth.authenticate()

    if (!requestingUser.admin) {
      return response.status(403).json({ error: 'Unauthorized' })
    }

    const { id } = params

    const user = await User.find(id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const categories = await UserCategory.query()
      .where('user_id', id)
      .preload('category')
      .then((result) => result.map((uc) => uc.category))

    const companies = await UserCompany.query()
      .where('user_id', id)
      .preload('company')
      .then((result) => result.map((uc) => uc.company))

    return response.json({
      ...user.serialize(),
      categories,
      companies,
    })
  }

  // UserController.ts
  async update({ params, request, auth, response }: HttpContext) {
    const loggedUser = auth.user
    if (!loggedUser?.admin) {
      return response.unauthorized({ error: 'Apenas administradores podem atualizar usuários' })
    }

    const userId = params.id
    const user = await User.find(userId)
    if (!user) {
      return response.notFound({ error: 'Usuário não encontrado' })
    }

    const {
      fullName,
      email,
      password,
      admin,
      active,
      companyIds = [],
      categoryIds = [],
    } = request.only([
      'fullName',
      'email',
      'password',
      'admin',
      'active',
      'companyIds',
      'categoryIds',
    ])

    user.fullName = fullName
    user.email = email
    user.admin = admin
    user.active = active

    if (password) {
      user.password = password
    }

    await user.save()

    if (!admin) {
      await UserCompany.query().where('userId', user.id).delete()
      const companiesToCreate = companyIds.map((companyId: number) => ({
        userId: user.id,
        companyId,
      }))
      await UserCompany.createMany(companiesToCreate)

      await UserCategory.query().where('userId', user.id).delete()
      const categoriesToCreate = categoryIds.map((categoryId: number) => ({
        userId: user.id,
        categoryId,
      }))
      await UserCategory.createMany(categoriesToCreate)
    } else {
      await UserCompany.query().where('userId', user.id).delete()
      await UserCategory.query().where('userId', user.id).delete()
    }

    const updatedUser = await User.query()
      .where('id', user.id)
      .preload('userCompanies', (query) => query.preload('company'))
      .preload('userCategories', (query) => query.preload('category'))
      .firstOrFail()

    return updatedUser
  }
}
