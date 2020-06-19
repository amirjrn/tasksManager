import * as crypto from 'crypto'
import * as jsonwebtoken from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'

const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export function validPassword(password, hash, salt) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}

export function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex')
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt: salt,
    hash: genHash,
  }
}

export function issueJWT(user) {
  const _id = user._id
  const expiresIn = '1d'
  const payload = {
    sub: _id,
    iat: Date.now(),
  }
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  }
}

module.exports.validPassword = validPassword
module.exports.genPassword = genPassword
module.exports.issueJWT = issueJWT
