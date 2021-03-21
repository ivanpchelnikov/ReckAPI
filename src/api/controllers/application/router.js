import * as express from 'express'
import reckController from './reckController'

export default express
  .Router()
  .get('/', reckController.getDivisible)
  .get('/texttosearch', reckController.getTextToSearch)
