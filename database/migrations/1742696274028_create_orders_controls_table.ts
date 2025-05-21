import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('shipping_date').nullable()
      table.integer('num').notNullable()
      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
      table.string('branch_order').notNullable()
      table.string('guarantee').notNullable()
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('order_data_id')
        .unsigned()
        .references('id')
        .inTable('orders_data')
        .notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
