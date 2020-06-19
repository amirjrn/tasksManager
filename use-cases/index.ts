import { tasksDb, usersDb } from './../data-access/index'

import { makeTasksUseCases } from './tasks'
import makeUserUseCases from './users'

const tasksUseCases = makeTasksUseCases(tasksDb, usersDb)
const userUseCases = makeUserUseCases(usersDb)

export { tasksUseCases, userUseCases }

// tasksUseCases.addTask({ userId: '5eec86cee7b3427a5bf51bb6', taskName: 'hey', taskDesc: 'there' })
