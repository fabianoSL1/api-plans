export type Page = {
  page: {
    size: number;
    current: number;
    total: number;
  };
  products: {
    id: string | number;
    name: string;
    describe: string | null;
    registeredAt: Date;
    removedAt: Date | null;
  }[];
};
