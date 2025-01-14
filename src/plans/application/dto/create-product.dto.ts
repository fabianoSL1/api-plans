export type CreateProductRequest = {
  name: string;
  describe?: string;
};

export type CreateProductResponse = {
  id: string;
  name: string;
  describe?: string;
};
