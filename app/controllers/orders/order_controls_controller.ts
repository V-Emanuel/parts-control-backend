import OrdersControl from '#models/orders_control'
import UserService from '#services/UserService'
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
      console.log('entrou aq')
      const body = await request.all()

      console.log(body)

      const user = await auth.authenticate()

      console.log('passou da auth')

      const orderControlValidated = await OrderControlValidator.validate(body)

      console.log('validou')

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
        const orderControl = await OrdersControl.create(orderControlValidated)
        return orderControl
      }

      const isEstoquista = await UserService.userHasCategory(user.id, 'Estoquista')

      if (isEstoquista) {
        const orderControl = await OrdersControl.create(orderControlValidated)
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
