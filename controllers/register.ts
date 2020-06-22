import { genPassword } from './../utils/helpers'
import { userUseCases } from './../use-cases/index'
export default function () {
  return async function (req, res, next) {
    if (!req.body.username) {
      res.status(400)
      return res.send({ success: false, msg: 'لطفا یک نام کاربری وارد کنید' })
    }
    if (!req.body.password) {
      res.status(400)
      return res.send({ success: false, msg: 'لطفا پسورد را وارد کنید' })
    }
    const saltHash = genPassword(req.body.password)
    const salt = saltHash.salt
    const hash = saltHash.hash
    const addUserResult = await userUseCases.addUser({ username: req.body.username, salt, hash })
    res.status(201).json({ success: addUserResult })
  }
}
