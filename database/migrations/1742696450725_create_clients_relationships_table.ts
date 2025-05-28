import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients_relationships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('first_contact').notNullable()
      table.datetime('second_contact').nullable()
      table.datetime('third_contact').nullable()
      table.datetime('agenda_date').nullable()
      table.datetime('application_date').nullable()
      table.text('observations').notNullable()
      table.integer('order_data_id').unsigned().references('id').inTable('orders_data')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
