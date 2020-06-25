import { Request, Response } from 'express'

import { logsUseCases } from './../use-cases/index'
export function entrance() {
  return async function (req: Request, res: Response, next) {
    var currentdate = new Date()
    var datetime =
      currentdate.getDay() +
      '/' +
      currentdate.getMonth() +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds()
    const action = 'ورود'
    await logsUseCases.addLog({ userId: req.body.username, date: datetime, action })
  }
}
export function exit() {
  return async function (req: Request, res: Response, next) {
    var currentdate = new Date()
    var datetime =
      'Last Sync: ' +
      currentdate.getDay() +
      '/' +
      currentdate.getMonth() +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds()
    const action = 'خروج'
    await logsUseCases.addLog({ userId: req.body.username, date: datetime, action })
    res.status(201).json({ message: 'با موفقیت خارج شدید' })
  }
}
