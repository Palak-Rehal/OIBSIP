import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getPizzaById } from "../../api/pizzaApi";

import PizzaGallery from "../../components/pizza/PizzaGallery";
import PizzaInfo from "../../components/pizza/PizzaInfo";
import SizeSelector from "../../components/pizza/SizeSelector";
import QuantitySelector from "../../components/pizza/QuantitySelector";
import PriceCard from "../../components/pizza/PriceCard";
import RelatedPizzas from "../../components/pizza/RelatedPizzas";

interface PizzaSize {
  _id?: string;
  size: string;
  price: number;
}

interface Pizza {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;

  rating: number;
  totalReviews: number;

  ingredients: string[];

  sizes: PizzaSize[];

  isAvailable: boolean;
  isFeatured: boolean;
}

const PizzaDetails = () => {
  const { id } = useParams();

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchPizza();
    }
  }, [id]);

  const fetchPizza = async () => {
    try {
      setLoading(true);

      const res = await getPizzaById(id!);

      setPizza(res.data.pizza);

      if (res.data.pizza.sizes.length > 0) {
        setSelectedSize(res.data.pizza.sizes[0]);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = useMemo(() => {
    if (!selectedSize) return 0;
    return selectedSize.price * quantity;
  }, [selectedSize, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Pizza...
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Pizza Not Found
      </div>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-16">

          <PizzaGallery
          image={pizza.image}
          name={pizza.name}
            />
          <div className="space-y-8">

            <PizzaInfo pizza={pizza} />

            <SizeSelector
              sizes={pizza.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <PriceCard
              price={selectedSize?.price || 0}
              quantity={quantity}
              total={totalPrice}
              pizzaId={pizza._id}
              size={selectedSize?.size || ""}
            />

          </div>

        </div>

        <RelatedPizzas category={pizza.category} />

      </div>
    </section>
  );
};

export default PizzaDetails;