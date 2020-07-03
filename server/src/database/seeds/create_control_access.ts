import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('control_access').insert([
    {mascara:"SIM",higienizacao:"SIM",temperatura:"SIM",conforme:"SIM", users_id: 1},
    {mascara:"SIM",higienizacao:"SIM",temperatura:"SIM",conforme:"SIM", users_id: 2},
    
  ]);
}