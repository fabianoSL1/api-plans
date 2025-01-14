import { Product } from './product.entity';

export class Plan {
  public readonly id?: string;
  public readonly name: string;
  public readonly products: Product[];
  constructor({
    id,
    name,
    products,
  }: {
    id?: string;
    name: string;
    products: Product[];
  }) {
    if (name === '') {
      throw new Error('nome do plano não pode ser vazio');
    }

    this.id = id;
    this.name = name;
    this.products = products;
  }
}
