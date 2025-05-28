import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import OrdersDatum from './orders_datum.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class ClientsRelationship extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare firstContact: DateTime

  @column.date({
    serialize: (value) => (value ? value.toFormat('yyyy-MM-dd') : null),
  })
  declare secondContact: DateTime | null

  @column.date({
    serialize: (value) => (value ? value.toFormat('yyyy-MM-dd') : null),
  })
  declare thirdContact: DateTime | null

  @column.date({
    serialize: (value) => (value ? value.toFormat('yyyy-MM-dd') : null),
  })
  declare agendaDate: DateTime | null

  @column.date({
    serialize: (value) => (value ? value.toFormat('yyyy-MM-dd') : null),
  })
  declare applicationDate: DateTime | null

  @column()
  declare observations: string

  @column({ isPrimary: true })
  declare orderDataId: number

  @belongsTo(() => OrdersDatum)
  declare ordeData: BelongsTo<typeof OrdersDatum>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
