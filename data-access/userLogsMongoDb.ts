import { Db } from 'mongodb'
import IlogsDb from './interfaces/IlogsDb'
import { ObjectId } from 'mongodb'
// get the database as argument and keep it in closure
export default function makeLogsMongoDb(makeDb: () => Promise<Db>): IlogsDb {
  // save function will check if an object with same id already exist then update it , if not insert new one
  async function save(log) {
    const db = await makeDb()
    const updateResult = await db.collection('logs').updateOne({ _id: new ObjectId(log.id) }, { $set: log })
    if (updateResult.result.n === 0) {
      const insertResult = await db.collection('logs').insertOne(log)
      return insertResult.result.ok ? true : false
    }
    return updateResult.result.ok ? true : false
  }

  // findAll function will find all logs and return it as an array
  async function findAll(): Promise<any> {
    const db = await makeDb()
    return await db.collection('logs').find().toArray()
  }

  // freeze the return value so that consumers of this object can not change it
  return Object.freeze({
    save,
    findAll,
  })
}
