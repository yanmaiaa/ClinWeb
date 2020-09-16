import { NextFunction, Request, Response } from 'express'

export const CORS = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-headers-origin', '*')
  res.set('access-control-methods-origin', '*')
  next()
}
