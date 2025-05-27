import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const OrderControlValidator = vine.compile(
  vine.object({
    shipping_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    num: vine.number().positive().optional(),
    type_id: vine.number().positive(),
    branch_order: vine.string().optional(),
    guarantee: vine.enum(['SIM', 'NÃO']),
    status_id: vine.number().positive().optional(),
    order_data_id: vine.number().positive(),
  })
)
