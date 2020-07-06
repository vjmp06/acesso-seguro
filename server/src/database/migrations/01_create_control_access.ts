import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('control_access', table => {
    table.increments('id').primary();
    table.string('mascara').notNullable();
    table.string('higienizacao').notNullable();
    table.string('temperatura').notNullable();
    table.string('conforme').notNullable();
    table.date('passagem').defaultTo(Date.now());
    
    table.integer('users_id')
      .notNullable()
      .references('id')
      .inTable('users');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('items');
}