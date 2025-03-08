import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Usuário Exemplo',
        email: 'user@example.com',
        password: 'senha123',
        admin: true,
      },
      {
        fullName: 'victor',
        email: 'victor@example.com',
        password: 'victor123',
        admin: false,
      },
      {
        fullName: 'joao',
        email: 'joao@example.com',
        password: 'joao123',
        admin: true,
      },
      {
        fullName: 'maria',
        email: 'maria@example.com',
        password: 'maria123',
        admin: false,
      },
    ])
  }
}
