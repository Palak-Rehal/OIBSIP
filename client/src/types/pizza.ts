export interface Pizza {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  ingredients: string[];
  bestseller: boolean;
  veg: boolean;
}