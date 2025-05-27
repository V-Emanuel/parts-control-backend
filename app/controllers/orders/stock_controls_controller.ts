import StockControl from '#models/stock_control'
import UserService from '#services/UserService'
import { StockControlValidator } from '#validators/stock_control'
import type { HttpContext } from '@adonisjs/core/http'

export default class StockControlsController {
  async index({ response }: HttpContext) {
    try {
      const stockControls = await StockControl.all()
      return stockControls
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno no servidor.' })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const body = request.all()
      const user = await auth.authenticate()
      const userId = user.id

      const stockControlValidated = await StockControlValidator.validate(body)

      const stockControlExists = await StockControl.query()
        .where('order_data_id', stockControlValidated.order_data_id)
        .first()

      if (stockControlExists) {
        return response.status(422).json({
          error: 'Unprocessable Entity',
          message: 'Dado já existe',
        })
      }

      if (user.admin) {
        const stockControl = await StockControl.create({
          nf: stockControlValidated.nf,
          nfDate: stockControlValidated.nf_date,
          accuracyDate: stockControlValidated.accuracy_date,
          entryDate: stockControlValidated.entry_date,
          orderDataId: stockControlValidated.order_data_id,
          userId: userId,
        })
        return stockControl
      }

      const isEstoquista = await UserService.userHasCategory(user.id, 'Estoquista')

      if (isEstoquista) {
        const stockControl = await StockControl.create({
          nf: stockControlValidated.nf,
          nfDate: stockControlValidated.nf_date,
          accuracyDate: stockControlValidated.accuracy_date,
          entryDate: stockControlValidated.entry_date,
          orderDataId: stockControlValidated.order_data_id,
          userId: userId,
        })
        return stockControl
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
      console.log('entrou aq')
      const user = await auth.authenticate()
      const userId = user.id
      const body = request.all()

      const orderId = Number(params.orderid)
      if (isNaN(orderId)) {
        return response.status(400).json({
          error: 'Bad Request',
          message: 'Parâmetro orderId inválido',
        })
      }

      const stockControlValidated = await StockControlValidator.validate({
        ...body,
        order_data_id: orderId,
      })

      const stockControl = await StockControl.query().where('order_data_id', orderId).first()

      if (!stockControl) {
        return response.status(404).json({
          error: 'Not Found',
          message: 'Controle de estoque não encontrado',
        })
      }

      const isAuthorized = user.admin || (await UserService.userHasCategory(userId, 'Estoquista'))

      if (!isAuthorized) {
        return response.status(403).json({
          error: 'Unauthorized',
          message: 'Usuário não tem permissão para editar este dado',
        })
      }

      stockControl.merge({
        nf: stockControlValidated.nf,
        nfDate: stockControlValidated.nf_date,
        accuracyDate: stockControlValidated.accuracy_date ?? null,
        entryDate: stockControlValidated.entry_date ?? null,
      })

      await stockControl.save()

      return response.ok(stockControl)
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        error: 'Erro interno no servidor',
      })
    }
  }
}
