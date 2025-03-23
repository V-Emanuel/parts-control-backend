import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import OrderDatum from './order_datum.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class StockControl extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nf: number

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare nfDate: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare accuracyDate: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare entryDate: DateTime

  @column()
  declare daysTt: number

  @column()
  declare daysStock: number

  @column({ isPrimary: true })
  declare order_data_id: number

  @belongsTo(() => OrderDatum)
  declare order_data: BelongsTo<typeof OrderDatum>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
