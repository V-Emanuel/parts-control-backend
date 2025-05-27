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
import CompaniesController from '#controllers/companies_controller'
import UserCompaniesController from '#controllers/user_companies_controller'
import OrderDataController from '#controllers/orders/order_data_controller'
import OrdersControlsController from '#controllers/orders/order_controls_controller'
import StockControlsController from '#controllers/orders/stock_controls_controller'
import ClientRelationshipsController from '#controllers/orders/client_relationships_controller'
import CategoriesController from '#controllers/categories_controller'
import UserCategoriesController from '#controllers/user_categories_controller'
import UsersController from '#controllers/users_controller'

router.get('/', async () => {
  return {
    hello: 'connected',
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

    router.get('/user-companies', [UserCompaniesController, 'index'])
    router.get('/user-categories', [UserCategoriesController, 'index'])
    router.get('/usersnames', [AuthController, 'usersnames'])

    router.get('/orderdata', [OrderDataController, 'index'])
    router.post('/orderdata', [OrderDataController, 'store'])

    router.get('/ordercontrol', [OrdersControlsController, 'index'])
    router.post('/ordercontrol', [OrdersControlsController, 'store'])
    router.put('/ordercontrol/:id', [OrdersControlsController, 'update'])

    router.get('/stockcontrol', [StockControlsController, 'index'])
    router.post('/stockcontrol', [StockControlsController, 'store'])
    router.put('/stockcontrol/:orderid', [StockControlsController, 'update'])

    router.get('/clientrelationship', [ClientRelationshipsController, 'index'])
    router.post('/clientrelationship', [ClientRelationshipsController, 'store'])

    router.get('/company', [CompaniesController, 'index'])

    router
      .group(() => {
        router.get('/category', [CategoriesController, 'index'])
        router.post('/category', [CategoriesController, 'store'])
        // router.delete('/category/:id', [CategoriesController, 'destroy'])

        router.post('/types', [TypesController, 'store'])
        // router.delete('/types/:id', [TypesController, 'destroy'])

        router.post('/statuses', [StatusesController, 'store'])
        // router.delete('/statuses/:id', [StatusesController, 'destroy'])

        router.get('/company/:id', [CompaniesController, 'show'])
        router.post('/company', [CompaniesController, 'store'])
        // router.delete('/company/:id', [CompaniesController, 'destroy'])

        router.post('/user-companies', [UserCompaniesController, 'store'])
        router.delete('/user-companies/:id', [UserCompaniesController, 'destroy'])

        router.post('/user-categories', [UserCategoriesController, 'store'])

        router.get('/users', [UsersController, 'index'])
        router.get('/users/:id', [UsersController, 'show'])
        router.put('/users/:id', [UsersController, 'update'])
      })
      .use(middleware.admin())
  })
  .use(middleware.auth())
