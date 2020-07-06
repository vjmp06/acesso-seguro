import { Request, Response } from 'express';
import knex from '../database/connection';
import Utils from '../utils/Utils';

class AccessController {
  
  
  async index (request: Request, response: Response) {
    let { dataInicial, dataFinal, conforme } = request.query;
    console.log(request.query)
    dataInicial = Utils.isNullOrUndefined(dataInicial) ?
       (new Date(new Date().setHours(24 * -30))).toISOString() :
      new Date(dataInicial as string).toISOString();
    

    dataFinal = Utils.isNullOrUndefined(dataFinal) ? 
      new Date().toISOString() : new Date(dataFinal as string).toISOString();
    
    conforme = Utils.isNullOrUndefined(conforme) ? '' : conforme;
    console.log(dataInicial);
    console.log(dataFinal);
    const control_access = await knex('control_access')
      .join('users', 'users_id', '=', 'users.id')
      .where('conforme', 'like', `%${conforme}%`)
      .select('users.nome', 'users.cpf', 'users.telefone', 'users.email', 'control_access.passagem', 'control_access.conforme');
    
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
      users_id
    } = request.body;
  
    //const trx = await knex.transaction();

    
  
    //short sintaxe
    const access_control = await knex('control_access').insert({
      mascara,
      higienizacao,
      temperatura,
      conforme,
      users_id
    });
  
    return response.json(access_control[0]);
  }
}

export default AccessController;