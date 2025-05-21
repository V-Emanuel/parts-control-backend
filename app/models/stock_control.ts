import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import OrdersDatum from './orders_datum.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

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

  @column({ isPrimary: true })
  declare orderDataId: number

  @belongsTo(() => OrdersDatum)
  declare orderData: BelongsTo<typeof OrdersDatum>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
