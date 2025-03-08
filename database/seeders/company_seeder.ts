import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'

export default class extends BaseSeeder {
  async run() {
    await Company.createMany([
      { name: 'Empresa A', code: 101 },
      { name: 'Empresa B', code: 202 },
      { name: 'Empresa C', code: 303 },
      { name: 'Empresa D', code: 404 },
    ])
  }
}
