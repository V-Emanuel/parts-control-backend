import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Status from '#models/status'

export default class extends BaseSeeder {
  async run() {
    await Status.createMany([
      { name: 'PENDENTE' },
      { name: 'ESTOQUE' },
      { name: 'FATURADO' },
      { name: 'PEÇA NÃO ATENDIDA' },
      { name: 'IMPORTADO' },
    ])
  }
}
