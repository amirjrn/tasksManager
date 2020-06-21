import { Request, Response } from 'express'

import { logsUseCases } from './../use-cases/index'
export function entrance() {
  return async function (req: Request, res: Response, next) {
    console.log('got here', req.body.username)
    const date = Date.now()
    const action = 'ورود'
    await logsUseCases.addLog({ userId: req.body.username, date, action })
  }
}
export function exit() {
  return async function (req: Request, res: Response, next) {
    console.log('exit')
    const date = Date.now()
    const action = 'خروج'
    await logsUseCases.addLog({ userId: req.body.username, date, action })
    res.status(201).json({ message: 'با موفقیت خارج شدید' })
  }
}
