import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nf').notNullable()
      table.datetime('nf_date')
      table.datetime('accuracy_date')
      table.datetime('entry_date')
      table.integer('days_tt').notNullable()
      table.integer('days_stock').notNullable()
      table.integer('order_data_id').unsigned().references('id').inTable('orders_data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
