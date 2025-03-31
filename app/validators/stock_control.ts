import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const StockControlValidator = vine.compile(
  vine.object({
    nf: vine.number().positive(),
    nf_date: vine.date().transform((date) => DateTime.fromJSDate(date)),
    acurrace_date: vine.date().transform((date) => DateTime.fromJSDate(date)),
    entry_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    order_data_id: vine.number().positive(),
  })
)
