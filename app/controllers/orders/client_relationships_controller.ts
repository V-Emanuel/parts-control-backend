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
      const userId = user.id

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
        const clientReationship = await ClientsRelationship.create({
          firstContact: clientReationshipValidated.first_contact,
          secondContact: clientReationshipValidated.second_contact,
          thirdContact: clientReationshipValidated.third_contact,
          agendaDate: clientReationshipValidated.agenda_date,
          applicationDate: clientReationshipValidated.application_date,
          observations: clientReationshipValidated.observations,
          orderDataId: clientReationshipValidated.order_data_id,
          userId: userId,
        })
        return clientReationship
      }

      const isCrm = await UserService.userHasCategory(user.id, 'CRM')

      if (isCrm) {
        const clientReationship = await ClientsRelationship.create({
          firstContact: clientReationshipValidated.first_contact,
          secondContact: clientReationshipValidated.second_contact,
          thirdContact: clientReationshipValidated.third_contact,
          agendaDate: clientReationshipValidated.agenda_date,
          applicationDate: clientReationshipValidated.application_date,
          observations: clientReationshipValidated.observations,
          orderDataId: clientReationshipValidated.order_data_id,
          userId: userId,
        })
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

  async update({ auth, request, response, params }: HttpContext) {
    try {
      const body = request.all()
      const user = await auth.authenticate()
      const userId = user.id
      const relationshipId = Number(params.id)

      const clientReationshipValidated = await ClientRealtionshipValidator.validate(body)

      const clientRelationship = await ClientsRelationship.query()
        .where('id', relationshipId)
        .first()

      if (!clientRelationship) {
        return response.status(404).json({
          error: 'Not Found',
          message: 'Registro de atendimento não encontrado',
        })
      }

      const isAdmin = user.admin
      const isCrm = await UserService.userHasCategory(user.id, 'CRM')

      if (!isAdmin && !isCrm) {
        return response.status(403).json({
          error: 'Unauthorized',
          message: 'Usuário não tem permissão para atualizar',
        })
      }

      clientRelationship.merge({
        firstContact: clientReationshipValidated.first_contact,
        secondContact: clientReationshipValidated.second_contact,
        thirdContact: clientReationshipValidated.third_contact,
        agendaDate: clientReationshipValidated.agenda_date,
        applicationDate: clientReationshipValidated.application_date,
        observations: clientReationshipValidated.observations,
        orderDataId: clientReationshipValidated.order_data_id,
        userId: userId,
      })

      await clientRelationship.save()
      return clientRelationship
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}
