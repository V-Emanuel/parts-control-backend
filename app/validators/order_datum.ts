import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const OrderDataValidator = vine.compile(
  vine.object({
    company_id: vine.number().positive(),
    os_orc: vine.number().positive(),
    order_date: vine.date().transform((date) => DateTime.fromJSDate(date)),
    client: vine.string().maxLength(50),
    model: vine.string().maxLength(50),
    description: vine.string().maxLength(500),
    quantity: vine.number().positive(),
  })
)
