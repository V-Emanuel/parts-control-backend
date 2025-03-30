import OrdersControl from '#models/orders_control'
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

  async store({ request, response }: HttpContext) {
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

      const orderControl = await OrdersControl.create(orderControlValidated)
      return response.status(201).json(orderControl)
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}
