import { Request, Response } from 'express';
import knex from '../database/connection';

class AccessController {
  async index (request: Request, response: Response) {
    //const { uf, city, items } = request.query;

    // const parsedItems = String(items)
    //   .split(',')
    //   .map(item => Number(item.trim()));

    const control_access = await knex('control_access')
      .join('users', 'users_id', '=', 'users.id')
      .select('*');
    
    // const serializedPoints = points.map(point => {
    //   return {
    //     ...point,
    //     image_url: `http://192.168.0.104:3333/uploads/${point.image}`,
    //   };
    // });

    return response.json(control_access);
  }

  async create (request: Request, response: Response) {
    //desestruturação
    const {
      mascara,
      higienizacao,
      temperatura,
      conforme,
      passagem,
      users_id
    } = request.body;
  
    //const trx = await knex.transaction();

    
  
    //short sintaxe
    const access_control = await knex('control_access').insert({
      mascara,
      higienizacao,
      temperatura,
      conforme,
      passagem,
      users_id
    });
  
    return response.json(access_control);
  }
}

export default AccessController;