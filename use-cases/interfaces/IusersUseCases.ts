import IUser from './../../domains/interfaces/IUser'
export default interface IusersUseCases {
  addUser: (IUser) => Promise<boolean>
  findUserByName: (string) => Promise<IUser>
  findUserById: (string) => Promise<IUser>
}
