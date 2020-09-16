import env from './config/env'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import ('./config/app')).default
    app.listen(5050, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
