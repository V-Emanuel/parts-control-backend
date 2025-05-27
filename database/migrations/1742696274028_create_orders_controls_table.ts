import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // PK

      table.datetime('shipping_date').nullable()
      table.integer('num').nullable()

      table
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('types')
        .onDelete('CASCADE')

      table.string('branch_order').nullable()

      table.string('guarantee').notNullable()

      table
        .integer('status_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('statuses')
        .onDelete('CASCADE')

      table
        .integer('order_data_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders_data')
        .onDelete('CASCADE')

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
