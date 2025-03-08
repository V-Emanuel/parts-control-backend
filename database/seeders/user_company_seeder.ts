import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserCompany from '#models/user_company'

export default class extends BaseSeeder {
  async run() {
    await UserCompany.createMany([
      { userId: 1, companyId: 1 },
      { userId: 1, companyId: 2 },
      { userId: 1, companyId: 3 },
      { userId: 2, companyId: 1 },
      { userId: 2, companyId: 3 },
      { userId: 3, companyId: 3 },
      { userId: 4, companyId: 3 },
      { userId: 4, companyId: 4 },
    ])
  }
}
