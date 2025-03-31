import OrdersControl from '#models/orders_control'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await OrdersControl.createMany([
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 1,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 2,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 3,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 5,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 8,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 9,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 10,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 12,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 13,
      },
      {
        shippingDate: DateTime.fromJSDate(faker.date.past()),
        num: faker.number.int({ max: 300 }),
        typeId: faker.number.int({ min: 1, max: 3 }),
        branchOrder: faker.number.int({ min: 200, max: 300 }),
        guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),

        statusId: faker.number.int({ min: 1, max: 3 }),
        orderDataId: 15,
      },
    ])
  }
}
