export type ProductTypes = {
  id?: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export type ProductResponse = {
  status?: boolean;
  code?: number;
  message?: string;
  data?: ProductTypes[] | ProductTypes | null;
}