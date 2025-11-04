import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import LineItem from '#models/line_item'

export enum TicketStatus {
  PENDING = 'pending',
  WON = 'won',
  LOST = 'lost',
}

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare imageUrl: string | null

  @column()
  declare totalAmount: number

  @column()
  declare status: TicketStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => LineItem)
  declare lineItems: HasMany<typeof LineItem>
}