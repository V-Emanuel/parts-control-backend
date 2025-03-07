/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'
import TypesController from '#controllers/types_controller'
import StatusesController from '#controllers/statuses_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .post('/register', [AuthController, 'register'])
  .as('auth.register')
  .use(middleware.auth())
  .use(middleware.admin())
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router
  .get('/me', [AuthController, 'me'])
  .as('auth.me')
  .use(middleware.auth())
  .use(middleware.admin())

router.get('/validate-token', async ({ response, auth }: HttpContext) => {
  try {
    const user = await auth.authenticate()
    return response.json({ id: user.id, fullName: user.fullName })
  } catch {
    return response.unauthorized({ message: 'Token inválido' })
  }
})

router
  .group(() => {
    router.get('/types', [TypesController, 'index'])
    router.get('types/:id', [TypesController, 'show'])
    router.get('/statuses', [StatusesController, 'index'])
    router.get('statuses/:id', [StatusesController, 'show'])

    router
      .group(() => {
        router.post('/types', [TypesController, 'store'])
        router.delete('/types/:id', [TypesController, 'destroy'])
        router.post('/statuses', [StatusesController, 'store'])
        router.delete('/statuses/:id', [StatusesController, 'destroy'])
      })
      .use(middleware.admin())
  })
  .use(middleware.auth())
