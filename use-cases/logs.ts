import Log from './../domains/Log'
import IlogsDb from '../data-access/interfaces/IlogsDb'

export default function makeTasksUseCases(logsDb: IlogsDb) {
  const addLog = async ({ userId, date, action }): Promise<boolean> => {
    const log = new Log(userId, date, action)
    return await logsDb.save(log)
  }
  return Object.freeze({
    addLog,
  })
}
