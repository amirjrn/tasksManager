import { Request, Response } from 'express'
export default function () {
  return async (req: Request, res: Response) => {
    res.status(200).json({
      tasks: req.user._tasks,
      success: true,
      msg: 'You are successfully authenticated to this route!',
    })
  }
}
