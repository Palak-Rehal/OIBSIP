import API from "./axios";

export const getAllPizzas = (
  search = "",
  category = "",
  sort = "latest",
  minPrice = 0,
  maxPrice = 1000,
  featured = false
) => {
  return API.get("/pizzas", {
    params: {
      search,
      category,
      sort,
      minPrice,
      maxPrice,
      featured,
      page: 1,
      limit: 1000,
    },
  });
};
export const getFeaturedPizzas = () => {
  return API.get("/pizzas", {
    params: {
      featured: true,
      page: 1,
      limit: 1000,
    },
  });
};


// Get single pizza/product
export const getPizzaById = (id: string) => {
  return API.get(`/pizzas/${id}`);
};