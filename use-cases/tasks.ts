import Task from '../domains/Task'
import ItasksMongoDb from '../data-access/interfaces/ItasksMongoDb'
import IusersMongoDb from '../data-access/interfaces/IusersMongoDb'
import User from '../domains/User'
export function makeTasksUseCases(tasksDb: ItasksMongoDb, usersDb: IusersMongoDb) {
  const addTask = async ({ userId, taskName, taskDesc }): Promise<boolean> => {
    const task = new Task({ taskName, taskDesc })
    const user = await usersDb.findOneById(userId)
    await usersDb.save(new User(user).addTask(task))
    return await tasksDb.save(task)
  }
  return Object.freeze({
    addTask,
  })
}
