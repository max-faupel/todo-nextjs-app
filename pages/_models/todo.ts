export class Todo {
  _id: string;
  description: string;
  done: boolean;
  targetDate: Date;

  constructor(
    _id = "",
    description = "",
    done = false,
    targetDate = new Date()
  ) {
    this._id = _id;
    this.description = description;
    this.done = done;
    this.targetDate = targetDate;
  }
}
