import * as express from 'express'
import taskController from './controllers/task'
import * as bodyParser from 'body-parser'
import { config } from 'dotenv'
import passportConfig from './config/passport'
import loginController from './controllers/login'
import registerContorller from './controllers/register'
import tasksContorller from './controllers/tasks'
import * as Passport from 'passport'
config()

const port = process.env.PORT || 4000
const app = express()

passportConfig(Passport)

// initialize passport object on every request
app.use(Passport.initialize())

// middlewares to parse get method urls and post method's json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {})

app.post('/register', registerContorller())
app.post('/login', loginController())

app.get('/tasks', Passport.authenticate('jwt', { session: false }), tasksContorller())

app.post('/task', taskController())

app.listen(port, function () {
  console.log(`server listening on port ${port}`)
})
