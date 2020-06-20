export default interface IlogsDb {
  save: (ITask) => Promise<boolean>
  findAll: () => Promise<any>
}
