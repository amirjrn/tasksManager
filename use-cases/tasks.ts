import Task from '../domains/Task'
import ItasksDb from '../data-access/interfaces/ItasksDb'
import IusersDb from '../data-access/interfaces/IusersDb'
import User from '../domains/User'
export default function makeTasksUseCases(tasksDb: ItasksDb, usersDb: IusersDb) {
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
