export class NotFound extends Error {
  public readonly status = 404;

  constructor(message: string) {
    super(message);
  }
}
