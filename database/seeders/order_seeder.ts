import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '#models/order'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const orders = []

    for (let i = 0; i < 30; i++) {
      orders.push({
        companyId: faker.number.int({ min: 1, max: 4 }),
        osOrc: faker.number.int({ min: 1000, max: 9999 }),
        orderDate: DateTime.fromJSDate(faker.date.past()),
        userId: faker.number.int({ min: 1, max: 4 }),
        client: faker.company.name(),
        model: faker.vehicle.model(),
        description: faker.commerce.productDescription(),
        quantity: faker.number.int({ min: 1, max: 50 }),
        shippingDate: DateTime.fromJSDate(faker.date.future()),
        num: faker.number.int({ min: 100, max: 999 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 1, max: 10 }),
        guarantee: `${faker.number.int({ min: 6, max: 24 })} meses`,
        pendingDays: faker.number.int({ min: 0, max: 15 }),
        statusId: faker.number.int({ min: 1, max: 4 }),
        nf: faker.number.int({ min: 1000, max: 9999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ min: 1, max: 30 }),
        daysStock: faker.number.int({ min: 1, max: 15 }),
        firstContact: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.past())),
        secondContact: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.past())),
        thirdContact: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.past())),
        agendaDate: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.future())),
        applicationDate: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.future())),
        observations: faker.helpers.maybe(() => faker.lorem.sentence()),
      })
    }

    await Order.createMany(orders)
  }
}
