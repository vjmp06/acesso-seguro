import { Request, Response } from 'express';
import knex from '../database/connection';

class AccessController {
  async index (request: Request, response: Response)  {
    const users = await knex('users').select('*');
    
    return response.json(users);
  }

  async show (request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    const user = await knex('users').where('cpf', id).first();

    if(!user) {
      return response.status(400).json({ message: 'User not found.' });
    }

    
    return response.json(user);
  }

}

export default AccessController;