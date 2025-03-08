import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/status'

export default class extends BaseSeeder {
  async run() {
    await Status.createMany([
      { name: 'Pendente' },
      { name: 'Em andamento' },
      { name: 'Concluído' },
      { name: 'Cancelado' },
    ])
  }
}
