import vine from '@vinejs/vine'

const password = vine.string().minLength(8)
const admin = vine.number().in([0, 1])

export const registerValidator = vine.compile(
  vine.object({
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
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)
