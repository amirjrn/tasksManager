export default interface ITask {
  id: number
  name: string
  desc: string
  done: boolean
  markDone: () => void
}
