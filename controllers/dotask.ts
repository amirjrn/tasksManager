import { Request, Response } from 'express'
import { tasksUseCases } from '../use-cases/index'
export default function () {
  return async (req: Request, res: Response) => {
    const dotaskResult = await tasksUseCases.doTask({ userId: req.user._id, taskId: req.body.taskId })
    const tasks = await tasksUseCases.getTasks({ userId: req.user._id })
    dotaskResult
      ? res.status(201).json({ message: 'انجام تسک با موفقیت ثبت شد', tasks })
      : res.status(400).json({ message: 'اضافه کردن تسک با موفقیت انجام نشد' })
  }
}
