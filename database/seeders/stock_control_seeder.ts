import StockControl from '#models/stock_control'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await StockControl.createMany([
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 1,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 2,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 3,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 4,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 5,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 6,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 7,
      },
      {
        nf: faker.number.int({ max: 9999999 }),
        nfDate: DateTime.fromJSDate(faker.date.past()),
        accuracyDate: DateTime.fromJSDate(faker.date.past()),
        entryDate: DateTime.fromJSDate(faker.date.past()),
        daysTt: faker.number.int({ max: 20 }),
        daysStock: faker.number.int({ max: 20 }),
        orderDataId: 8,
      },
    ])
  }
}
