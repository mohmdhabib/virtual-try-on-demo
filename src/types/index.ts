export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface TryOnState {
  isActive: boolean;
  selectedProduct: Product | null;
}