import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.add)
  .get('/', controller.all)
  .get('/:id', controller.byId)
  .put('/:id', controller.execute);
