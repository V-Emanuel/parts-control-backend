import { DateTime } from 'luxon'
import User from './user.js'
import Company from './company.js'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class OrdersDatum extends BaseModel {
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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
