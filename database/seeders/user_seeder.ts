import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Usuário Exemplo',
        email: 'user@example.com',
        password: 'senha123',
        admin: 1,
      },
      {
        fullName: 'victor',
        email: 'victor@example.com',
        password: 'victor123',
        admin: 1,
      },
    ])
  }
}
