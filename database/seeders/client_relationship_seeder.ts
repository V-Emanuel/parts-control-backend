// import ClientsRelationship from '#models/clients_relationship'
// import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import { faker } from '@faker-js/faker'
// import { DateTime } from 'luxon'

// export default class extends BaseSeeder {
//   async run() {
//     const clientsData = Array.from({ length: 50 }, (_, index) => ({
//       firstContact: DateTime.fromJSDate(faker.date.past()),
//       secondContact: DateTime.fromJSDate(faker.date.past()),
//       thirdContact: DateTime.fromJSDate(faker.date.past()),
//       agendaDate: DateTime.fromJSDate(faker.date.past()),
//       applicationDate: DateTime.fromJSDate(faker.date.past()),
//       observations: faker.lorem.paragraph(),
//       orderDataId: 120 - index,
//       userId: faker.helpers.arrayElement([1, 2, 5, 7, 8, 11]),
//     }))

//     await ClientsRelationship.createMany(clientsData)
//   }
// }
