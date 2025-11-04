import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Ticket from '#models/ticket'

export enum LineItemStatus {
  PENDING = 'pending',
  GREEN = 'green',  // Won
  RED = 'red',      // Lost
}

export default class LineItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ticketId: number

  @column()
  declare betDetails: Record<string, any>  // JSON object for OCR-extracted data (e.g., { sport: 'NFL', team: 'Chiefs', odds: -110 })

  @column()
  declare status: LineItemStatus

  @column()
  declare sportradarId: string | null  // ID from Sportradar API for matching

  @column()
  declare odds: number | null

  @column()
  declare amount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Ticket)
  declare ticket: BelongsTo<typeof Ticket>
}