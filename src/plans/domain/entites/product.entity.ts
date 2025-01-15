import { InvalidInput } from '../../../shared/exceptions/invalidInput';

export class Product {
  public readonly id!: string;
  public readonly name: string;
  public readonly describe?: string;

  constructor({
    id,
    name,
    describe,
  }: {
    id?: string;
    name: string;
    describe?: string;
  }) {
    if (name === '') {
      throw new InvalidInput('nome do produto não pode ser vazio');
    }

    this.id = id;
    this.name = name;
    this.describe = describe;
  }
}
