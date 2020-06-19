import ITask from './../../domains/interfaces/ITask'
export default interface ItasksMongoDb {
  save: (ITask) => Promise<boolean>
  findAll: () => Promise<ITask[]>
}
