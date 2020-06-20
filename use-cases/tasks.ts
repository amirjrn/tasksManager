import Task from '../domains/Task'
import ItasksMongoDb from '../data-access/interfaces/ItasksMongoDb'
import IusersMongoDb from '../data-access/interfaces/IusersMongoDb'
import User from '../domains/User'
export function makeTasksUseCases(tasksDb: ItasksMongoDb, usersDb: IusersMongoDb) {
  const addTask = async ({ userId, taskName, taskDesc }): Promise<boolean> => {
    const task = new Task({ taskName, taskDesc })
    const userData = await usersDb.findOneById(userId)
    const user = new User(userData)
    user.addTask(task)
    await usersDb.save(user)
    return await tasksDb.save(task)
  }
  return Object.freeze({
    addTask,
  })
}
