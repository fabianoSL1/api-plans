import { InvalidInput } from '../../../shared/exceptions/invalidInput';

export class Product {
  public id!: string;
  public planId!: string;

  constructor(
    public readonly name: string,
    public readonly describe: string | null,
    public readonly registeredAt: Date,
    public removedAt: Date | null,
  ) {
    if (name === '') {
      throw new InvalidInput('nome do produto não pode ser vazio');
    }
  }

  isAvailable() {
    return this.removedAt !== null;
  }
}
