// import StockControl from '#models/stock_control'
// import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { faker } from '@faker-js/faker'
// import { DateTime } from 'luxon'

// export default class extends BaseSeeder {
//   async run() {
//     const stockData = Array.from({ length: 50 }, (_, index) => ({
//       nf: faker.number.int({ max: 9999999 }),
//       nfDate: DateTime.fromJSDate(faker.date.past()),
//       accuracyDate: DateTime.fromJSDate(faker.date.past()),
//       entryDate: DateTime.fromJSDate(faker.date.past()),
//       orderDataId: index + 40,
//       userId: faker.helpers.arrayElement([1, 2, 4, 6, 7, 8, 10, 11]),
//     }))

//     await StockControl.createMany(stockData)
//   }
// }
