import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'admin 1', //1
        email: 'admin1@example.com',
        password: 'admin123',
        admin: true,
        active: true,
      },
      {
        fullName: 'admin 2', //2
        email: 'victor@example.com',
        password: 'admin123',
        admin: true,
        active: true,
      },
      {
        fullName: 'consultor', //3
        email: 'consultor@example.com',
        password: 'senha123',
        admin: false,
        active: true,
      },
      {
        fullName: 'estoquista', //4
        email: 'mateus@example.com',
        password: 'maria123',
        admin: false,
        active: true,
      },
      {
        fullName: 'crm', //5
        email: 'crm@example.com',
        password: 'senha123',
        admin: false,
        active: true,
      },
      {
        fullName: 'consultor estoquista', //6
        email: 'consultor_estoquista@example.com',
        password: 'senha123',
        admin: false,
        active: true,
      },
      {
        fullName: 'estoquista crm', //7
        email: 'estoquista_crm@example.com',
        password: 'senha123',
        admin: false,
        active: true,
      },
      {
        fullName: 'tudo mas n admin', //8
        email: 'tudo@example.com',
        password: 'senha123',
        admin: false,
        active: true,
      },
      {
        fullName: 'desativado 1', //9
        email: 'desativado1@example.com',
        password: 'senha123',
        admin: false,
        active: false,
      },
      {
        fullName: 'desativado 2', //10
        email: 'desativado2@example.com',
        password: 'senha123',
        admin: false,
        active: false,
      },
      {
        fullName: 'admin desativado', //11
        email: 'admin_desativado@example.com',
        password: 'senha123',
        admin: true,
        active: false,
      },
    ])
  }
}
