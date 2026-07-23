import PizzaCard from "../Menu/PizzaCard";

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
  pizzas: Pizza[];
  loading: boolean;
}

const PizzaGrid = ({ pizzas, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-96 rounded-3xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (pizzas.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No pizzas found 🍕
        </h2>

        <p className="mt-3 text-gray-500">
          Try another category or search keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
      {pizzas.map((pizza) => (
        <PizzaCard
          key={pizza._id}
          pizza={pizza}
        />
      ))}
    </div>
  );
};

export default PizzaGrid;