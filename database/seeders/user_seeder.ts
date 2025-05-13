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
        active: true,
      },
      {
        fullName: 'victor',
        email: 'victor@example.com',
        password: 'victor123',
        admin: false,
        active: true,
      },
      {
        fullName: 'joao',
        email: 'joao@example.com',
        password: 'joaoo123',
        admin: true,
        active: true,
      },
      {
        fullName: 'maria',
        email: 'maria@example.com',
        password: 'maria123',
        admin: false,
        active: false,
      },
      {
        fullName: 'pedro',
        email: 'pedro@example.com',
        password: 'maria123',
        admin: false,
        active: false,
      },
      {
        fullName: 'paulo',
        email: 'paulo@example.com',
        password: 'maria123',
        admin: false,
        active: true,
      },
      {
        fullName: 'mateus',
        email: 'mateus@example.com',
        password: 'maria123',
        admin: false,
        active: true,
      },
      {
        fullName: 'jorge',
        email: 'jorge@example.com',
        password: 'maria123',
        admin: false,
        active: false,
      },
    ])
  }
}
