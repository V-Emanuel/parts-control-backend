import OrdersDatum from '#models/orders_datum'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const orders = Array.from({ length: 120 }, () => ({
      companyId: faker.number.int({ min: 1, max: 4 }),
      osOrc: faker.helpers.arrayElement([22456, 20452, 23445]),
      orderDate: DateTime.fromJSDate(faker.date.past()),
      userId: faker.helpers.arrayElement([1, 2, 3, 6, 8, 9, 11]),
      client: faker.person.firstName(),
      model: faker.animal.cat(),
      description: faker.lorem.sentence(),
      quantity: faker.number.int({ max: 20 }),
    }))

    await OrdersDatum.createMany(orders)
  }
}
