import ClientsRelationship from '#models/clients_relationship'
import UserService from '#services/UserService'
import { ClientRealtionshipValidator } from '#validators/client_relationship'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientRelationshipsController {
  async index({ response }: HttpContext) {
    try {
      const clientReationship = await ClientsRelationship.all()
      return clientReationship
    } catch (error) {
      return response.status(500).json({ error: 'Erro interno no servidor.' })
    }
  }

  async store({ auth, request, response }: HttpContext) {
    try {
      const body = request.all()
      const user = await auth.authenticate()

      const clientReationshipValidated = await ClientRealtionshipValidator.validate(body)

      const dataExists = await ClientsRelationship.query()
        .where('order_data_id', clientReationshipValidated.order_data_id)
        .first()

      if (dataExists) {
        return response.status(422).json({
          error: 'Unprocessable Entity',
          message: 'Dado já existe',
        })
      }
      if (user.admin) {
        const clientReationship = await ClientsRelationship.create(clientReationshipValidated)
        return clientReationship
      }

      const isCrm = await UserService.userHasCategory(user.id, 'CRM')

      if (isCrm) {
        const clientReationship = await ClientsRelationship.create(clientReationshipValidated)
        return clientReationship
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
