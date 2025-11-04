import type { HttpContext } from '@adonisjs/core/http'
import Ticket, { TicketStatus } from '#models/ticket'

export default class TicketsController {
  async index({ auth, request }: HttpContext) {
    const user = auth.user!
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const tickets = await Ticket.query()
      .where('userId', user.id)
      .preload('lineItems')
      .paginate(page, limit)

    return tickets
  }

  async show({ auth, params }: HttpContext) {
    const user = auth.user!
    const ticket = await Ticket.query()
      .where('userId', user.id)
      .where('id', params.id)
      .preload('lineItems')
      .firstOrFail()

    return ticket
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.user!
    const data = request.only(['imageUrl', 'totalAmount'])

    const ticket = await Ticket.create({
      ...data,
      userId: user.id,
      status: TicketStatus.PENDING,
    })

    return ticket
  }

  async update({ auth, params, request }: HttpContext) {
    const user = auth.user!
    const ticket = await Ticket.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    const data = request.only(['imageUrl', 'totalAmount', 'status'])
    ticket.merge(data)
    await ticket.save()

    return ticket
  }

  async destroy({ auth, params }: HttpContext) {
    const user = auth.user!
    const ticket = await Ticket.query()
      .where('userId', user.id)
      .where('id', params.id)
      .firstOrFail()

    await ticket.delete()

    return { message: 'Ticket deleted successfully' }
  }
}