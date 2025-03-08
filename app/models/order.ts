import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Type from './type.js'
import Status from './status.js'
import Company from './company.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ isPrimary: true })
  declare companyId: number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column()
  declare osOrc: number

  @column.date({
    serialize: (value) => value.toFormat('yyyy-MM-dd'),
  })
  declare orderDate: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare client: string

  @column()
  declare model: string

  @column()
  declare description: string

  @column()
  declare quantity: number

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
  declare observations: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
