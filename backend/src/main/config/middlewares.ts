import { Express } from 'express'
import { bodyParser, contentType, CORS } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(CORS)
  app.use(contentType)
}
