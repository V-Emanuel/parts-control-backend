import Category from '#models/category'
import OrdersControl from '#models/orders_control'
import UserCategory from '#models/user_category'
import { OrderControlValidator } from '#validators/onder_control'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrdersControlsController {
  async index({ response }: HttpContext) {
    try {
      const ordersControl = await OrdersControl.all()
      return ordersControl
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno no servidor.' })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const body = await request.all()
      const orderControlValidated = await OrderControlValidator.validate(body)

      const orderControlExists = await OrdersControl.query()
        .where('order_data_id', orderControlValidated.order_data_id)
        .first()

      if (orderControlExists) {
        return response.status(422).json({
          error: 'Unprocessable Entity',
          message: 'Dado já existe',
        })
      }

      const user = await auth.authenticate()
      const userCategories = await UserCategory.query().where('userId', user.id)
      const categoriesId = userCategories.map((category) => category.categoryId)

      if (categoriesId.length === 0) {
        return response.status(403).json({
          error: 'Unauthorized',
          message: 'Cargo do Usuário não permite criação desse dado',
        })
      }

      const categoryName = await Category.query()
        .whereIn('id', categoriesId)
        .andWhere('name', 'Estoquista')
        .first()

      if (categoryName) {
        const orderControl = await OrdersControl.create(orderControlValidated)
        return response.status(201).json(orderControl)
      }
      return response.status(403).json({
        error: 'Unauthorized',
        message: 'Cargo do Usuário não permite criação desse dado',
      })
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}
