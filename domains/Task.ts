import ITask from './interfaces/ITask'
export default class Task implements ITask {
  private _id: number
  get id(): number {
    return this._id
  }

  private _name: string
  get name(): string {
    return this._name
  }

  private _desc: string
  get desc(): string {
    return this._desc
  }

  private _done: boolean
  get done(): boolean {
    return this._done
  }

  constructor({ id = undefined, taskName = undefined, taskDesc = undefined, done = false } = {}) {
    this._id = id
    this._name = taskName
    this._desc = taskDesc
    this._done = done
  }

  markDone() {
    this._done = true
  }
}
