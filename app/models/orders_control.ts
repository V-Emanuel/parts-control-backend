import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Type from './type.js'
import Status from './status.js'
import OrdersDatum from './orders_datum.js'
import User from './user.js'

export default class OrdersControl extends BaseModel {
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
  declare branchOrder: string

  @column()
  declare guarantee: string

  @column({ isPrimary: true })
  declare statusId: number

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

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
