// import type { HttpContext } from '@adonisjs/core/http'
// // import Order from '#models/order'
// import UserCompany from '#models/user_company'

// export default class OrdersController {
//   async index({ auth, response }: HttpContext) {
//     const user = await auth.authenticate()

//     if (user.admin === true) {
//       const orders = await Order.query().preload('company')
//       return response.json(orders)
//     }

//     const userCompanies = await UserCompany.query().where('user_id', user.id).preload('company')

//     const companyIds = userCompanies.map((uc) => uc.companyId)

//     const orders = await Order.query().whereIn('company_id', companyIds).preload('company')

//     return response.json(orders)
//   }

//   async edit({ params, response }: HttpContext) {
//     const order = await Order.find(params.id)

//     if (!order) {
//       return response.status(404).json({ message: 'Pedido não encontrado' })
//     }

//     return response.json(order)
//   }

//   async update({ params, request, response }: HttpContext) {
//     const order = await Order.find(params.id)

//     if (!order) {
//       return response.status(404).json({ message: 'Pedido não encontrado' })
//     }

//     const orderData = request.only([
//       'company_id',
//       'os_orc',
//       'order_date',
//       'user_id',
//       'client',
//       'model',
//       'description',
//       'quantity',
//       'shipping_date',
//       'num',
//       'type_id',
//       'branch_order',
//       'guarantee',
//       'pending_days',
//       'status_id',
//       'nf',
//       'nf_date',
//       'accuracy_date',
//       'entry_date',
//       'days_tt',
//       'days_stock',
//       'first_contact',
//       'second_contact',
//       'third_contact',
//       'agenda_date',
//       'application_date',
//       'observations',
//     ])

//     order.merge(orderData)

//     await order.save()

//     return response.json(order)
//   }

//   async destroy({ params, auth, response }: HttpContext) {
//     const user = await auth.authenticate()

//     if (user.admin !== true) {
//       return response
//         .status(403)
//         .json({ message: 'Acesso negado: apenas administradores podem excluir pedidos' })
//     }

//     const order = await Order.find(params.id)

//     if (!order) {
//       return response.status(404).json({ message: 'Pedido não encontrado' })
//     }

//     await order.delete()

//     return response.status(200).json({ message: 'Pedido excluído com sucesso' })
//   }
// }
