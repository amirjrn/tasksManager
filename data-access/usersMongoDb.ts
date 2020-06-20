import { Db } from 'mongodb'
import IUser from './../domains/interfaces/IUser'
import IusersDb from './interfaces/IusersDb'
import { ObjectId } from 'mongodb'
// get the database as argument and keep it in closure
export default function makeTasksMongoDb(makeDb: () => Promise<Db>): IusersDb {
  // save function will check if an object with same id already exist then update it if not insert new one
  async function save(user: IUser) {
    const db = await makeDb()
    const updateResult = await db.collection('users').updateOne({ _id: new ObjectId(user.id) }, { $set: user })
    if (updateResult.result.n === 0) {
      const insertResult = await db.collection('users').insertOne(user)
      return insertResult.result.ok ? true : false
    }
    return updateResult.result.ok ? true : false
  }

  // findAll function will find all tasks and return it as an array
  async function findAll(): Promise<IUser[]> {
    const db = await makeDb()
    return await db.collection('users').find().toArray()
  }
  // findOne function will find a single document by argument provided
  async function findOne(value: string): Promise<IUser> {
    const db = await makeDb()
    const res = await db.collection('users').find({ _username: value }).toArray()
    return res[0]
  }
  async function findOneById(id) {
    const db = await makeDb()
    const res = await db
      .collection('users')
      .find({ _id: new ObjectId(id) })
      .toArray()
    return res[0]
  }
  // freeze the return value so that consumers of this object can not change it
  return Object.freeze({
    save,
    findAll,
    findOne,
    findOneById,
  })
}
