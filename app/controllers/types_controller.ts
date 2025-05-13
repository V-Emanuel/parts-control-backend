import Type from '#models/type'
import { NameValidator } from '#validators/name'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesController {
  async index({}: HttpContext) {
    const types = await Type.all()
    return types
  }

  async store({ request }: HttpContext) {
    const body = await request.all()
    const bodyValidate = await NameValidator.validate(body)
    const type = Type.create(bodyValidate)

    return type
  }

  async show({ request }: HttpContext) {
    const typeId = request.param('id')
    const type = await Type.findOrFail(typeId)
    return type
  }

  // async destroy({ request }: HttpContext) {
  //   const typeId = request.param('id')
  //   const type = await Type.findOrFail(typeId)
  //   await type.delete()

  //   return type
  // }
}
