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
          shippingDate: orderControlValidated.shipping_date || null,
          num: orderControlValidated.num || null,
          typeId: orderControlValidated.type_id,
          branchOrder: orderControlValidated.branch_order || null,
          guarantee: orderControlValidated.guarantee,
          statusId: orderControlValidated.status_id || null,
          orderDataId: orderControlValidated.order_data_id,
          userId: userId,
        })

        return orderControl
      }

      const isEstoquista = await UserService.userHasCategory(user.id, 'Estoquista')

      if (isEstoquista) {
        const orderControl = await OrdersControl.create({
          shippingDate: orderControlValidated.shipping_date || null,
          num: orderControlValidated.num || null,
          typeId: orderControlValidated.type_id,
          branchOrder: orderControlValidated.branch_order || null,
          guarantee: orderControlValidated.guarantee,
          statusId: orderControlValidated.status_id || null,
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

  async update({ auth, request, response, params }: HttpContext) {
    try {
      const user = await auth.authenticate()
      const userId = user.id
      const body = request.all()

      const id = Number(params.id)
      if (!id) {
        return response.status(400).json({
          error: 'Bad Request',
          message: 'ID do controle não fornecido',
        })
      }

      const orderControl = await OrdersControl.find(id)
      if (!orderControl) {
        return response.status(404).json({
          error: 'Not Found',
          message: 'Controle de pedido não encontrado',
        })
      }

      if (!user.admin && !(await UserService.userHasCategory(userId, 'Estoquista'))) {
        return response.status(403).json({
          error: 'Unauthorized',
          message: 'Usuário não tem permissão para atualizar o dado',
        })
      }

      const validatedData = await OrderControlValidator.validate(body)

      orderControl.shippingDate = validatedData.shipping_date ?? null
      orderControl.num = validatedData.num ?? null
      orderControl.typeId = validatedData.type_id
      orderControl.branchOrder = validatedData.branch_order || null
      orderControl.guarantee = validatedData.guarantee
      orderControl.statusId = validatedData.status_id || null
      orderControl.orderDataId = validatedData.order_data_id
      orderControl.userId = userId

      await orderControl.save()

      return orderControl
    } catch (error) {
      return response.status(500).json({
        error: 'Erro interno no servidor',
        message: error.message,
      })
    }
  }
}
