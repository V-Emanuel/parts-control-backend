import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stock_controls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('nf').notNullable()
      table.date('nf_date')
      table.date('accuracy_date')
      table.date('entry_date')
      table.integer('days_tt').notNullable()
      table.integer('days_stock').notNullable()
      table.integer('orders_data_id').unsigned().references('id').inTable('orders_data')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
