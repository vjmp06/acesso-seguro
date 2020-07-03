import { Request, Response } from 'express';
import knex from '../database/connection';

class AccessController {
  async index (request: Request, response: Response)  {
    const users = await knex('users').select('*');
    
    return response.json(users);
  }

}

export default AccessController;