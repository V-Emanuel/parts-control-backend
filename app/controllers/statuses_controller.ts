import type { HttpContext } from '@adonisjs/core/http'
import { NameValidator } from '#validators/name'
import Status from '#models/status'

export default class StatusesController {
  async index({}: HttpContext) {
    const statuses = await Status.all()
    return statuses
  }

  async store({ request }: HttpContext) {
    const body = await request.all()
    const bodyValidate = await NameValidator.validate(body)
    const status = Status.create(bodyValidate)

    return status
  }

  async show({ request }: HttpContext) {
    const statusId = request.param('id')
    const status = await Status.findOrFail(statusId)
    return status
  }

  // async destroy({ request }: HttpContext) {
  //   const statusId = request.param('id')
  //   const status = await Status.findOrFail(statusId)
  //   await status.delete()

  //   return status
  // }
}
