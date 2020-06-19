import IUser from './interfaces/IUser'
import ITask from './interfaces/ITask'
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
  constructor({ id = null, username, hash, salt, tasks = [] }) {
    this._id = id
    this._username = username
    this._hash = hash
    this._salt = salt
    this._tasks = tasks
  }
  addTask(task) {
    this._tasks.concat(task)
  }
}
