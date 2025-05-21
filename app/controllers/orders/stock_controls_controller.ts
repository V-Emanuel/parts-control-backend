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
}
