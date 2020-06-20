import { Db } from 'mongodb'
import ITask from './../domains/interfaces/ITask'
import ItasksMongoDb from './interfaces/ItasksMongoDb'
// get the database as argument and keep it in closure
export default function makeTasksMongoDb(makeDb: () => Promise<Db>): ItasksMongoDb {
  // save function will check if an object with same id already exist then update it if not insert new one
  async function save(task: ITask) {
    const db = await makeDb()
    // const updateResult = await db.collection('tasks').updateOne({ id: task.id }, { $set: task })
    // if (updateResult.result.n === 0) {
      const insertResult = await db.collection('tasks').insertOne(task)
      return insertResult.result.ok ? true : false
    // // }
    // return updateResult.result.ok ? true : false
  }

  // findAll function will find all tasks and return it as an array
  async function findAll(): Promise<ITask[]> {
    const db = await makeDb()
    return await db.collection('tasks').find().toArray()
  }

  // freeze the return value so that consumers of this object can not change it
  return Object.freeze({
    save,
    findAll,
  })
}
