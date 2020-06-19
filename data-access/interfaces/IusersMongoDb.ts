import IUser from './../../domains/interfaces/IUser'
export default interface IusersMongoDb {
  save: (IUser) => Promise<boolean>
  findAll: () => Promise<IUser[]>
  findOne: (string) => Promise<IUser>
  findOneById: (string) => Promise<IUser>
}
