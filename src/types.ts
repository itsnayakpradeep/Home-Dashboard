export interface Category {
    id: number;
    title: string;
    products: Product[];
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
  }