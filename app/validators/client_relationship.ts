import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const ClientRealtionshipValidator = vine.compile(
  vine.object({
    first_contact: vine.date().transform((date) => DateTime.fromJSDate(date)),
    second_contact: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    third_contact: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    agenda_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    application_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    observations: vine.string().maxLength(300).optional(),
    order_data_id: vine.number().positive(),
  })
)
