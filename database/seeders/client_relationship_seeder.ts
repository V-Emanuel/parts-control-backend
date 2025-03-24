import ClientsRelationship from '#models/clients_relationship'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await ClientsRelationship.createMany([
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 1,
      },
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 2,
      },
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 4,
      },
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 5,
      },
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 7,
      },
      {
        firstContact: DateTime.fromJSDate(faker.date.past()),
        secondContact: DateTime.fromJSDate(faker.date.past()),
        thirdContact: DateTime.fromJSDate(faker.date.past()),
        agendaDate: DateTime.fromJSDate(faker.date.past()),
        applicationDate: DateTime.fromJSDate(faker.date.past()),
        observations: faker.lorem.paragraph(),
        orderDataId: 8,
      },
    ])
  }
}
