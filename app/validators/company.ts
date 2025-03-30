import vine from '@vinejs/vine'

export const CompanyValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(30),
    code: vine
      .number()
      .max(9999999)
      .unique(async (db, value) => {
        const match = await db.from('companies').select('id').where('code', value).first()

        return !match
      }),
  })
)
