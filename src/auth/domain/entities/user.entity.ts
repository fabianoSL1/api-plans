import { InvalidInput } from '../../../shared/exceptions/invalidInput';

export class User {
  public name: string;
  public registeredAt: Date;
  public lastAuth: Date;

  constructor(name: string) {
    if (name === '') {
      throw new InvalidInput('nome não pode ser vazio');
    }

    this.name = name;
  }
}
