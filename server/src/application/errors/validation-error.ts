import { Err } from "./err";

export class ValidationError extends Err {
  constructor(message: string) {
    super(message, 400);
  }
}