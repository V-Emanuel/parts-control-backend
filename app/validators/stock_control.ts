import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const StockControlValidator = vine.compile(
  vine.object({
    nf: vine.number().positive(),
    nf_date: vine.date().transform((date) => DateTime.fromJSDate(date)),
    accuracy_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    entry_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    order_data_id: vine.number().positive(),
  })
)
