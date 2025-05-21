import OrdersControl from '#models/orders_control'
import UserService from '#services/UserService'
import { OrderControlValidator } from '#validators/order_control'
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

      const user = await auth.authenticate()
      const userId = user.id

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

      if (user.admin) {
        const orderControl = await OrdersControl.create({
          shippingDate: orderControlValidated.shipping_date,
          num: orderControlValidated.num,
          typeId: orderControlValidated.type_id,
          branchOrder: orderControlValidated.branch_order,
          guarantee: orderControlValidated.guarantee,
          statusId: orderControlValidated.status_id,
          orderDataId: orderControlValidated.order_data_id,
          userId: userId,
        })
        return orderControl
      }

      const isEstoquista = await UserService.userHasCategory(user.id, 'Estoquista')

      if (isEstoquista) {
        const orderControl = await OrdersControl.create({
          shippingDate: orderControlValidated.shipping_date,
          num: orderControlValidated.num,
          typeId: orderControlValidated.type_id,
          branchOrder: orderControlValidated.branch_order,
          guarantee: orderControlValidated.guarantee,
          statusId: orderControlValidated.status_id,
          orderDataId: orderControlValidated.order_data_id,
          userId: userId,
        })
        return orderControl
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
