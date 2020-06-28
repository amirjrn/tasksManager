import * as express from 'express'
import * as path from 'path'
import taskController from './controllers/task'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import * as cors from 'cors'
import passportConfig from './config/passport'
import loginController from './controllers/login'
import logoutController from './controllers/logout'
import registerContorller from './controllers/register'
import tasksContorller from './controllers/tasks'
import dotaskController from './controllers/dotask'
import { entrance, exit } from './controllers/logs'
import * as Passport from 'passport'
config()

const port = process.env.PORT || 4000
const app = express()

app.use(express.static('public'))

app.use(cookieParser())
passportConfig(Passport)

// initialize passport object for requests
app.use(Passport.initialize())

// middlewares to parse get method urls and post method's json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/api/task', taskController())
app.post('/api/dotask', Passport.authenticate('jwt', { session: false }), dotaskController())

app.post('/api/register', registerContorller())
app.post('/api/login', loginController(), entrance())
app.post('/api/logout', Passport.authenticate('jwt', { session: false }), logoutController(), exit())

app.get('/api/tasks', Passport.authenticate('jwt', { session: false }), tasksContorller())

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(port, function () {
  console.log(`server listening on port ${port}`)
})
