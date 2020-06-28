import { Request, Response } from 'express'

export default function () {
  return async function (req: Request, res: Response, next) {
    const user = req.user
    if (!user) {
      res.status(401)
      return res.send({ success: false, msg: 'این نام پیدا نشد. لطفا دوباره امتحان کنید' })
    }
    res.cookie('token', null, { maxAge: 1 })
    res.status(200).end()
    next(null, user)
  }
}
