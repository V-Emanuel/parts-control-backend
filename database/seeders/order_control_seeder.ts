// import OrdersControl from '#models/orders_control'
// import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { faker } from '@faker-js/faker'
// import { DateTime } from 'luxon'

// export default class extends BaseSeeder {
//   async run() {
//     const controlData = Array.from({ length: 50 }, (_, index) => ({
//       shippingDate: DateTime.fromJSDate(faker.date.past()),
//       num: faker.number.int({ max: 300 }),
//       typeId: faker.number.int({ min: 1, max: 3 }),
//       branchOrder: faker.helpers.arrayElement(['ab123', '1563A', '23C2DE', 'AGH4561']),
//       guarantee: faker.helpers.arrayElement(['SIM', 'NÃO']),
//       statusId: faker.number.int({ min: 1, max: 3 }),
//       orderDataId: index + 1,
//       userId: faker.helpers.arrayElement([1, 2, 4, 6, 7, 8, 10, 11]),
//     }))

//     await OrdersControl.createMany(controlData)
//   }
// }
