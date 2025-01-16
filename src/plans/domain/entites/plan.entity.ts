import { InvalidInput } from '../../../shared/exceptions/invalidInput';
import { Product } from './product.entity';

export class Plan {
  public id!: string;

  constructor(
    public name: string,
    public products: Product[],
  ) {
    if (name === '') {
      throw new InvalidInput('nome do plano não pode ser vazio');
    }
  }
}
