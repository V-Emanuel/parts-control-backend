import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nf').notNullable()
      table.datetime('nf_date').notNullable()
      table.datetime('accuracy_date').nullable()
      table.datetime('entry_date').nullable()
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
