import IUser from './interfaces/IUser'
import ITask from './interfaces/ITask'
import { Timestamp } from 'mongodb'
import task from '../controllers/task'
export default class User implements IUser {
  private _id: string
  get id(): string {
    return this._id
  }
  private _username: string
  get username(): string {
    return this._username
  }
  private _hash: string
  get hash(): string {
    return this._hash
  }
  private _salt: string
  get salt(): string {
    return this._salt
  }
  private _tasks: ITask[]
  get tasks(): ITask[] {
    return this._tasks
  }
  constructor({ _id = null, _username, _hash, _salt, _tasks = {} }) {
    this._id = _id
    this._username = _username
    this._hash = _hash
    this._salt = _salt
    this._tasks = _tasks
  }
  addTask(task) {
    var date = new Date()
    const dateFull = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    if (!this._tasks[dateFull]) {
      this._tasks[dateFull] = []
    }
    this._tasks[dateFull].push(task)
  }
  doTask(taskId) {
    const task = this._tasks.map((tasks) => tasks.find((task) => (task._id = taskId)))
    task._done = true
  }
}
