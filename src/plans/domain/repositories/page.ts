export type Page<T> = {
  results: T[];
  page: {
    size: number;
    current: number;
    total: number;
  };
};
