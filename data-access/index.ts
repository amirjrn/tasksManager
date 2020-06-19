import makeTasksMongoDb from './tasksMongoDb'
import makeUsersMongoDb from './usersMongoDb'
import mongodb from './configs/mongodb'

const tasksDb = makeTasksMongoDb(mongodb)
const usersDb = makeUsersMongoDb(mongodb)

export { tasksDb, usersDb }
