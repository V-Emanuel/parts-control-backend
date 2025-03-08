import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
      table.integer('os_orc').notNullable()
      table.date('order_date').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('client').notNullable()
      table.string('model').notNullable()
      table.text('description').notNullable()
      table.integer('quantity').notNullable()
      table.date('shipping_date')
      table.integer('num').notNullable()
      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
      table.integer('branch_order').notNullable()
      table.string('guarantee').notNullable()
      table.integer('pending_days').notNullable()
      table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('CASCADE')
      table.integer('nf').notNullable()
      table.date('nf_date')
      table.date('accuracy_date')
      table.date('entry_date')
      table.integer('days_tt').notNullable()
      table.integer('days_stock').notNullable()
      table.date('first_contact').nullable()
      table.date('second_contact').nullable()
      table.date('third_contact').nullable()
      table.date('agenda_date').nullable()
      table.date('application_date').nullable()
      table.text('observations').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
