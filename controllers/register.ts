import { genPassword } from './../utils/helpers'
import { userUseCases } from './../use-cases/index'
export default function () {
  return async function (req, res, next) {
    const saltHash = genPassword(req.body.password)
    const salt = saltHash.salt
    const hash = saltHash.hash
    const addUserResult = await userUseCases.addUser({ username: req.body.username, salt, hash })
    res.status(201).json({ success: addUserResult })
  }
}
