import API from "./axios";

export const getFeaturedPizzas = () =>
  API.get("/pizzas?featured=true");

export const getAllPizzas = () =>
  API.get("/pizzas");

export const getPizzaById = (id: string) =>
  API.get(`/pizzas/${id}`);