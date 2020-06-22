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
  private _date: string
  get date(): string {
    return this._date
  }
  constructor({
    id = undefined,
    taskName = undefined,
    taskDesc = undefined,
    done = false,
    _date = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate(),
  } = {}) {
    this._id = id
    this._name = taskName
    this._desc = taskDesc
    this._done = done
    this._date = _date
  }

  markDone() {
    this._done = true
  }
}
