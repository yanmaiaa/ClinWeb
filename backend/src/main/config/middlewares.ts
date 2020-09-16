import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'
import { CORS } from '../middlewares/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(CORS)
  app.use(contentType)
}
