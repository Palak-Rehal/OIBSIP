import { useEffect, useState } from "react";
import { getAllPizzas } from "../../api/pizzaApi";
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

interface Props {
  category: string;
}

const RelatedPizzas = ({
  category,
}: Props) => {

  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    fetchRelated();
  }, [category]);

  const fetchRelated = async () => {

    try {

      const res = await getAllPizzas(
        "",
        category,
        "rating"
      );

      setPizzas(res.data.pizzas.slice(0, 4));

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <section className="mt-24">

      <h2 className="text-3xl font-black mb-8">
        Related Pizzas
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {pizzas.map((pizza) => (

          <PizzaCard
            key={pizza._id}
            pizza={pizza}
          />

        ))}

      </div>

    </section>

  );
};

export default RelatedPizzas;