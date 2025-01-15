export type GetPlanProduct = {
  id: string;
  name: string;
  describe: string | null;
};

export type GetPlanResponse = {
  id: string;
  name: string;
  products: GetPlanProduct[];
};
