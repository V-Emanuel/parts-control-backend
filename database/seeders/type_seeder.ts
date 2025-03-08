import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Type from '#models/type'

export default class extends BaseSeeder {
  async run() {
    await Type.createMany([
      { name: 'Orçamento' },
      { name: 'Ordem de Serviço' },
      { name: 'Pedido Especial' },
    ])
  }
}
