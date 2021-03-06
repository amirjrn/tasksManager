import User from '../domains/User'
import IUser from './../domains/interfaces/IUser'
import IusersUseCases from './interfaces/IusersUseCases'
import IusersDb from '../data-access/interfaces/IusersDb'
export default function (db: IusersDb): IusersUseCases {
  const addUser = async ({ username, hash, salt }: IUser): Promise<boolean> => {
    const user = new User({ _username: username, _hash: hash, _salt: salt })
    return await db.save(user)
  }

  const findUserByName = async (username: string): Promise<IUser> => {
    return await db.findOne(username)
  }
  const findUserById = async (id: string): Promise<IUser> => {
    return await db.findOneById(id)
  }
  return Object.freeze({
    addUser,
    findUserByName,
    findUserById,
  })
}
