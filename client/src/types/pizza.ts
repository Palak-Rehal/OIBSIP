export interface PizzaSize {
  size: string;
  price: number;
}

export interface Pizza {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;

  sizes: PizzaSize[];

  ingredients: string[];

  rating: number;
  totalReviews: number;

  isFeatured: boolean;
  isAvailable: boolean;

  createdAt?: string;
  updatedAt?: string;
}