import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'

export default class extends BaseSeeder {
  async run() {
    await Company.createMany([
      { name: 'Peugeot', code: 41 },
      { name: 'emp 1', code: 41 },
      { name: 'emp 2', code: 41 },
      { name: 'emp 3', code: 41 },
    ])
  }
}
