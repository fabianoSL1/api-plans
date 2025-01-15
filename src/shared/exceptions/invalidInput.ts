export class InvalidInput extends Error {
  public readonly status = 400;

  constructor(message: string) {
    super(message);
  }
}
