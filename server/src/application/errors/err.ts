export class Err extends Error {
  private _status: number;

  constructor(message, status) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}