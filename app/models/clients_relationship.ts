import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import OrdersDatum from './orders_datum.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ClientsRelationship extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare firstContact: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare secondContact: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare thirdContact: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare agendaDate: DateTime

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare applicationDate: DateTime

  @column()
  declare observations: string | null

  @column({ isPrimary: true })
  declare orderDataId: number

  @belongsTo(() => OrdersDatum)
  declare ordeData: BelongsTo<typeof OrdersDatum>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
