import Category from '#models/category'
import OrdersDatum from '#models/orders_datum'
import UserCategory from '#models/user_category'
import UserCompany from '#models/user_company'
import { OrderDataValidator } from '#validators/order_datum'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrderDataController {
  async index({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate()

      if (user.admin) {
        const orderData = await OrdersDatum.all()
        return response.json(orderData)
      }

      const userCompanies = await UserCompany.query().where('userId', user.id).select('companyId')

      const companyIds = userCompanies.map((company) => company.companyId)

      if (companyIds.length === 0) {
        return response.json([])
      }

      const orders = await OrdersDatum.query().whereIn('companyId', companyIds)

      return response.json(orders)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const body = await request.all()
      const user = await auth.authenticate()
      const userId = user.id
      const userAdmin = user.admin

      const orderValidated = await OrderDataValidator.validate(body)

      if (userAdmin) {
        const orderData = OrdersDatum.create({
          companyId: orderValidated.company_id,
          osOrc: orderValidated.os_orc,
          orderDate: orderValidated.order_date,
          userId: userId,
          client: orderValidated.client,
          model: orderValidated.model,
          description: orderValidated.description,
          quantity: orderValidated.quantity,
        })
        return response.status(201).json(orderData)
      }

      const userCategories = await UserCategory.query().where('userId', userId)
      const categoriesId = userCategories.map((category) => category.categoryId)

      if (categoriesId.length == 0) {
        return response.status(403).json({
          error: 'Unauthorized',
          message: 'Cargo do Usuário não permite criação desse dado',
        })
      }

      const categoryName = await Category.query()
        .whereIn('id', categoriesId)
        .andWhere('name', 'Consultor Técnico')
        .first()

      const userCompanies = await UserCompany.query().where('userId', userId)
      const companyIds = userCompanies.map((company) => company.companyId)

      if (categoryName && companyIds.includes(orderValidated.company_id)) {
        const orderData = OrdersDatum.create({
          companyId: orderValidated.company_id,
          osOrc: orderValidated.os_orc,
          orderDate: orderValidated.order_date,
          userId: userId,
          client: orderValidated.client,
          model: orderValidated.model,
          description: orderValidated.description,
          quantity: orderValidated.quantity,
        })
        return response.status(201).json(orderData)
      }

      return response.status(403).json({
        error: 'Unauthorized',
        message: 'Usuário não possui permissão para criar dados referente a essa empresa',
      })
    } catch (error) {
      console.error('erro na hora de salvar os dados', error)
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}
