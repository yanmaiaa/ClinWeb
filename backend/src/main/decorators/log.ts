import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller) {}

  handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
