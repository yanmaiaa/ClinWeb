import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

/* adaptRoute = Função que retorna outra função.
* A função de retorno da função adaptRoute retorna uma Promise.
*/
export const adaptRoute = (controller: Controller): (req: Request, res: Response) => Promise<void> => {
  const expressAdapter = async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
  return expressAdapter
}
