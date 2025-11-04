import type { HttpContext } from '@adonisjs/core/http'
import LineItem, { LineItemStatus } from '#models/line_item'
import Ticket from '#models/ticket'

export default class LineItemsController {
  async index({ auth, params }: HttpContext) {
    const user = auth.user!

    // Ensure the ticket belongs to the user
    await Ticket.query()
      .where('userId', user.id)
      .where('id', params.ticketId)
      .firstOrFail()

    const lineItems = await LineItem.query()
      .where('ticketId', params.ticketId)
      .preload('ticket')

    return lineItems
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.user!

    const lineItem = await LineItem.query()
      .where('id', params.id)
      .whereHas('ticket', (query) => query.where('userId', user.id))
      .preload('ticket')
      .firstOrFail()

    return lineItem
  }

  async store({ auth, params, request }: HttpContext) {
    const user = auth.user!

    // Ensure the ticket belongs to the user
    const ticket = await Ticket.query()
      .where('userId', user.id)
      .where('id', params.ticketId)
      .firstOrFail()

    const data = request.only(['betDetails', 'odds', 'amount'])

    const lineItem = await LineItem.create({
      ...data,
      ticketId: ticket.id,
      status: LineItemStatus.PENDING,
    })

    return lineItem
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.user!

    const lineItem = await LineItem.query()
      .where('id', params.id)
      .whereHas('ticket', (query) => query.where('userId', user.id))
      .firstOrFail()

    const data = request.only(['betDetails', 'status', 'sportradarId', 'odds', 'amount'])
    lineItem.merge(data)
    await lineItem.save()

    return lineItem
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.user!

    const lineItem = await LineItem.query()
      .where('id', params.id)
      .whereHas('ticket', (query) => query.where('userId', user.id))
      .firstOrFail()

    await lineItem.delete()

    return { message: 'Line item deleted successfully' }
  }
}