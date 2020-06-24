import * as express from 'express'
import taskController from './controllers/task'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import * as cors from 'cors'
import passportConfig from './config/passport'
import loginController from './controllers/login'
import registerContorller from './controllers/register'
import tasksContorller from './controllers/tasks'
import dotaskController from './controllers/dotask'
import { entrance, exit } from './controllers/logs'
import * as Passport from 'passport'
config()

const port = process.env.PORT || 4000
const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.static('public'))

app.use(cookieParser())
passportConfig(Passport)

// initialize passport object for requests
app.use(Passport.initialize())

// middlewares to parse get method urls and post method's json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/task', taskController())
app.post('/dotask', Passport.authenticate('jwt', { session: false }), dotaskController())
app.get('/', (req, res) => {
  res.send('index.html')
})

app.post('/register', registerContorller())
app.post('/login', loginController(), entrance())
app.post('/logout', exit())

app.get('/tasks', Passport.authenticate('jwt', { session: false }), tasksContorller())

app.listen(port, function () {
  console.log(`server listening on port ${port}`)
})
