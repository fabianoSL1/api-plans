import {
  CreateProductRequest,
  CreateProductResponse,
} from './create-product.dto';

export type CreatePlanRequest = {
  name: string;
  products: CreateProductRequest[];
};

export type CreatePlanResponse = {
  id: string;
  name: string;
  products: CreateProductResponse[];
};
