import API from "./axios";

export const getFeaturedPizzas = () =>
  API.get("/pizzas?featured=true");

export const getAllPizzas = (
  search = "",
  category = "",
  sort = "",
  minPrice = 0,
  maxPrice = 1000,
  featured = false
) =>
  API.get("/pizzas", {
    params: {
      search,
      category,
      sort,
      minPrice,
      maxPrice,
      featured,
    },
  });

export const getPizzaById = (id: string) =>
  API.get(`/pizzas/${id}`);