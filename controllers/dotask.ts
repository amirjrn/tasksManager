import { Request, Response } from 'express'
import { tasksUseCases } from '../use-cases/index'
export default function () {
  return async (req: Request, res: Response) => {
    const dotaskResult = await tasksUseCases.doTask({ userId: req.user._userId, taskId: req.body.taskId })
    dotaskResult ? res.status(201).json({ message: 'انجام تسک با موفقیت ثبت شد' }) : res.status(400).json({ message: 'اضافه کردن تسک با موفقیت انجام نشد' })
  }
}
