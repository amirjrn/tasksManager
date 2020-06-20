import { tasksDb, usersDb, logsDb } from './../data-access/index'

import makeTasksUseCases from './tasks'
import makeUserUseCases from './users'
import makeLogsUseCases from './logs'

const tasksUseCases = makeTasksUseCases(tasksDb, usersDb)
const userUseCases = makeUserUseCases(usersDb)
const logsUseCases = makeLogsUseCases(logsDb)

export { tasksUseCases, userUseCases, logsUseCases }
