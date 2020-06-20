import makeTasksMongoDb from './tasksMongoDb'
import makeUsersMongoDb from './usersMongoDb'
import makeLogsMongoDb from './userLogsMongoDb'
import mongodb from './configs/mongodb'

const tasksDb = makeTasksMongoDb(mongodb)
const usersDb = makeUsersMongoDb(mongodb)
const logsDb = makeLogsMongoDb(mongodb)

export { tasksDb, usersDb, logsDb }
