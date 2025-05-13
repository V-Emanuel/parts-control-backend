import type { HttpContext } from '@adonisjs/core/http'

import Category from '#models/category'
import { NameValidator } from '#validators/name'

export default class CategoriesController {
  async index({}: HttpContext) {
    const categories = await Category.all()
    return categories
  }

  async store({ request }: HttpContext) {
    const body = await request.all()
    const bodyValidate = await NameValidator.validate(body)
    const category = Category.create(bodyValidate)
    return category
  }

  async show({ request }: HttpContext) {
    const categoryId = request.param('id')
    const category = await Category.findOrFail(categoryId)
    return category
  }

  // async destroy({ request }: HttpContext) {
  //   const categoryId = request.param('id')
  //   const category = await Category.findOrFail(categoryId)
  //   await category.delete()
  //   return category
  // }
}
