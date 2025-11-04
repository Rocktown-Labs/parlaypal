import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'line_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('ticket_id').unsigned().references('id').inTable('tickets').onDelete('CASCADE')
      table.json('bet_details')
      table.enum('status', ['pending', 'green', 'red']).defaultTo('pending')
      table.string('sportradar_id').nullable()
      table.decimal('odds', 6, 2).nullable()
      table.decimal('amount', 10, 2)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}