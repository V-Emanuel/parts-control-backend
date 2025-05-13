import type { HttpContext } from '@adonisjs/core/http'

import Company from '#models/company'
import { CompanyValidator } from '#validators/company'
import UserCompany from '#models/user_company'

export default class CompaniesController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    if (user.admin) {
      const companies = await Company.all()
      return companies
    }

    const userCompanies = UserCompany.query().where('userId', user.id).select('companyId')
    const companiesIds = (await userCompanies).map((company) => company.companyId)

    if (companiesIds.length === 0) {
      return response.json([])
    }

    const companies = await Company.query().whereIn('companyId', companiesIds)
    return companies
  }

  async store({ request }: HttpContext) {
    const body = await request.all()
    const bodyValidate = await CompanyValidator.validate(body)
    const company = Company.create(bodyValidate)

    return company
  }

  async show({ request }: HttpContext) {
    const companyId = request.param('id')
    const company = await Company.findByOrFail(companyId)
    return company
  }

  // async destroy({ request }: HttpContext) {
  //   const companyId = request.param('id')
  //   const company = await Company.findOrFail(companyId)
  //   await company.delete()

  //   return company
  // }
}
