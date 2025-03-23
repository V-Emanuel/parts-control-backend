import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Type from './type.js'
import Status from './status.js'
import OrderDatum from './order_datum.js'

export default class OrderControl extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare shippingDate: DateTime

  @column()
  declare num: number

  @column({ isPrimary: true })
  declare typeId: number

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @column()
  declare branchOrder: number

  @column()
  declare guarantee: string

  @column()
  declare pendingDays: number

  @column({ isPrimary: true })
  declare statusId: number

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @column({ isPrimary: true })
  declare order_data_id: number

  @belongsTo(() => OrderDatum)
  declare order_data: BelongsTo<typeof OrderDatum>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
