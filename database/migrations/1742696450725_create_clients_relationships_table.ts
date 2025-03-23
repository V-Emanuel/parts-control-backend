import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients_relationships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('first_contact').nullable()
      table.date('second_contact').nullable()
      table.date('third_contact').nullable()
      table.date('agenda_date').nullable()
      table.date('application_date').nullable()
      table.text('observations').nullable()
      table.integer('orders_data').unsigned().references('id').inTable('orders_data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
