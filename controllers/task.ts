import { Request, Response } from 'express'
import { tasksUseCases } from '../use-cases/index'
export default function () {
  return async (req: Request, res: Response) => {
    const addTaskResult = await tasksUseCases.addTask(req.body)
    addTaskResult
      ? res.status(201).json({ message: 'task added' })
      : res.status(400).json({ message: 'could not create task' })
  }
}
