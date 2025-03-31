import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const ClientRealtionshipValidator = vine.compile(
  vine.object({
    first_contact: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    second_contact: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    third_contact: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    agenda_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    application_date: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .nullable(),
    observations: vine.string().maxLength(300).nullable(),
    order_data_id: vine.number().positive(),
  })
)
