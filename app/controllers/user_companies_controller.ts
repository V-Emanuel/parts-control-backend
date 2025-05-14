import Company from '#models/company'
import UserCompany from '#models/user_company'
import { HttpContext } from '@adonisjs/core/http'

export default class UserCompaniesController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (user.admin) {
        const companies = await Company.all()
        return response.json(companies)
      }

      const userCompanies = await UserCompany.query().where('user_id', user.id).preload('company')

      const companies = userCompanies.map((uc) => uc.company)
      return response.json(companies)
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }

  async store({ request, auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (!user.admin) {
        return response.unauthorized({ message: 'Apenas administradores podem atribuir acessos.' })
      }

      const { userId, companyId } = request.only(['userId', 'companyId'])

      const userCompany = await UserCompany.create({ userId, companyId })

      return response.status(201).json(userCompany)
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (!user.admin) {
        return response.unauthorized({ message: 'Apenas administradores podem remover acessos.' })
      }

      const userCompany = await UserCompany.find(params.id)

      if (!userCompany) {
        return response.notFound({ message: 'Usuário não encontrado.' })
      }

      await userCompany.delete()

      return response.json({ message: 'Acesso removido com sucesso.' })
    } catch (error) {
      return response.status(500).json({ error: 'Erro no Servidor' })
    }
  }
}
