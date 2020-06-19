import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import * as fs from 'fs'
import * as path from 'path'
import { userUseCases } from './../use-cases/index'
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
}

// app.js will pass the global passport object here, and this function will configure it
export default (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async function (jwt_payload, done) {
      const user = await userUseCases.findUserById(jwt_payload.sub)
      done(null, user)
    })
  )
}
