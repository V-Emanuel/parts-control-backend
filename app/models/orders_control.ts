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
    serialize: (value) => value?.toFormat('yyyy-MM-dd') || null,
  })
  declare shippingDate: DateTime | null

  @column()
  declare num: number | null

  @column()
  declare typeId: number

  @belongsTo(() => Type)
  declare type: BelongsTo<typeof Type>

  @column()
  declare branchOrder: string | null

  @column()
  declare guarantee: string

  @column()
  declare statusId: number | null

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @column()
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
