import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserCompany from '#models/user_company'

export default class extends BaseSeeder {
  async run() {
    await UserCompany.createMany([
      { userId: 3, companyId: 1 },
      { userId: 3, companyId: 2 },
      { userId: 4, companyId: 2 },
      { userId: 4, companyId: 3 },
      { userId: 5, companyId: 1 },
      { userId: 5, companyId: 2 },
      { userId: 5, companyId: 4 },
      { userId: 6, companyId: 1 },
      { userId: 6, companyId: 2 },
      { userId: 6, companyId: 3 },
      { userId: 6, companyId: 4 },
      { userId: 8, companyId: 4 },
      { userId: 9, companyId: 2 },
      { userId: 10, companyId: 1 },
      { userId: 10, companyId: 2 },
      { userId: 10, companyId: 3 },
      { userId: 10, companyId: 4 },
    ])
  }
}
