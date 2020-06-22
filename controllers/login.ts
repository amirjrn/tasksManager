import { Request, Response } from 'express'
import { validPassword, issueJWT } from './../utils/helpers'
import { userUseCases } from './../use-cases/index'
export default function () {
  return async function (req: Request, res: Response, next) {
    const user = await userUseCases.findUserByName(req.body.username)
    if (!user) {
      res.status(401)
      return res.send({ success: false, msg: 'این نام پیدا نشد. لطفا دوباره امتحان کنید' })
    }
    const isValid = validPassword(req.body.password, user._hash, user._salt)
    if (!isValid) {
      res.status(401).json({ success: false, msg: 'پسورد وارد شده اشتباه است . لطفا دوباره امتحان کنید' })
    }
    const tokenObject = issueJWT(user)
    res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
    console.log(user)
    next(null, user)
  }
}
