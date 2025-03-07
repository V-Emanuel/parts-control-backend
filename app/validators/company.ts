import vine from '@vinejs/vine'

export const CompanyValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(30),
    code: vine.number().max(9999999),
  })
)
