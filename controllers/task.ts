import { Request, Response } from 'express'
import { tasksUseCases } from '../use-cases/index'
export default function () {
  return async (req: Request, res: Response) => {
    
    const addTaskResult = await tasksUseCases.addTask(req.body)
    addTaskResult
      ? res.status(201).json({ message: 'تسک اضافه شد' })
      : res.status(400).json({ message: 'اضافه کردن تسک با موفقیت انجام نشد' })
  }
}
