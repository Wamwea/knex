/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('lessons',(table)=>{
        table.increments().primary().notNullable()
        table.text('name',128).notNullable()
        table.timestamps(true,true)
    })
    .createTable('messages',table=>{
        table.increments()
        table.text('sender').notNullable().index()
        table.text('text').notNullable()
        table.timestamps(true,true)
        //Foreign key to 'lessons' table
        table.integer('lesson_id').notNullable().unsigned().references('id').inTable('lessons').onDelete('CASCADE').onUpdate('CASCADE')

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons')
};
