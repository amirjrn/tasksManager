export default class Log {
  private _username: string
  get username(): string {
    return this._username
  }
  private _date: Date
  get date(): Date {
    return this._date
  }
  private _action: 'ورود' | 'خروج'
  get action(): 'ورود' | 'خروج' {
    return this._action
  }
  constructor(_username, _date, _action) {
    this._username = _username
    this._date = _date
    this._action = _action
  }
}
