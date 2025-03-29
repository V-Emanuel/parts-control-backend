import OrdersDatum from '#models/orders_datum'
import UserCompany from '#models/user_company'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrderDataController {
  async index({ auth, response }: HttpContext) {
    const user = await auth.authenticate()

    if (user.admin) {
      const orderData = await OrdersDatum.all()
      return response.json(orderData)
    }

    const userCompanies = UserCompany.query().where('userId', user.id)

    const companyIds = (await userCompanies).map((item: { companyId: any }) => item.companyId)
    const orders = await OrdersDatum.query().whereIn('companyId', companyIds)

    return orders
  }
}
