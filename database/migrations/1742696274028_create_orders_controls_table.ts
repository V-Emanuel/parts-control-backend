import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('shipping_date')
      table.integer('num').notNullable()
      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
      table.integer('branch_order').notNullable()
      table.string('guarantee').notNullable()
      table.integer('pending_days').notNullable()
      table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('CASCADE')
      table.integer('orders_data_id').unsigned().references('id').inTable('orders_data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
