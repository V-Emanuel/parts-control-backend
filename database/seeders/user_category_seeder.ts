import UserCategory from '#models/user_category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserCategory.createMany([
      { userId: 2, categoryId: 1 },
      { userId: 2, categoryId: 2 },
      { userId: 4, categoryId: 3 },
    ])
  }
}
