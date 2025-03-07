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

router.get('/types', [TypesController, 'index']).use(middleware.auth())
router.get('types/:id', [TypesController, 'show']).use(middleware.auth())
router.post('/types', [TypesController, 'store']).use(middleware.auth()).use(middleware.admin())
router
  .delete('/types/:id', [TypesController, 'destroy'])
  .use(middleware.auth())
  .use(middleware.admin())
