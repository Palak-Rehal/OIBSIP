import { useEffect, useState } from "react";
import { getFeaturedPizzas } from "../../api/pizzaApi";
import PizzaCard from "../common/PizzaCard";

interface Pizza {
  _id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  sizes: {
    size: string;
    price: number;
  }[];
}

const PopularPizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const res = await getFeaturedPizzas();
      setPizzas(res.data.pizzas);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 pb-20">
      <div className="flex items-end justify-between mb-7">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E2B27]">
          Popular Pizzas
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading pizzas...</p>
        ) : (
          pizzas.map((pizza) => (
            <PizzaCard
              key={pizza._id}
              pizza={pizza}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PopularPizzas;