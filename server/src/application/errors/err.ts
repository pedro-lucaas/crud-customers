export class Err extends Error {
  public readonly status: number;

  constructor(message, status) {
    super(message);
    this.status = status;
  }
}