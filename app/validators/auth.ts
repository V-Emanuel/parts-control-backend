import vine from '@vinejs/vine'

const password = vine.string().minLength(8)
const admin = vine.boolean()

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(50),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()

        return !match
      }),
    password,
    admin,
    active: vine.boolean(),
    companies: vine.array(vine.number().positive()).optional().nullable(),
    categories: vine.array(vine.number().positive()).optional().nullable(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
