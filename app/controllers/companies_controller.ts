import type { HttpContext } from '@adonisjs/core/http'

import Company from '#models/company'
import { CompanyValidator } from '#validators/company'

export default class CompaniesController {
  async index({}: HttpContext) {
    const companies = await Company.all()
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

  async destroy({ request }: HttpContext) {
    const companyId = request.param('id')
    const company = await Company.findOrFail(companyId)
    await company.delete()

    return company
  }
}
