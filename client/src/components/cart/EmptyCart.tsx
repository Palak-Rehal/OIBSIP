import {
  ShoppingCart,
  ArrowRight,
  Pizza,
  Truck,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-32 pb-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <div className="mx-auto w-32 h-32 rounded-full bg-[#BD6A3C]/10 flex items-center justify-center">
            <ShoppingCart
              size={58}
              className="text-[#BD6A3C]"
            />
          </div>

          <h1 className="mt-8 text-5xl font-black text-[#2E2B27]">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Looks like you haven't added any delicious pizzas yet.
            Browse our handcrafted menu and discover your next
            favorite meal.
          </p>

          <Link
            to="/menu"
            className="inline-flex items-center gap-3 mt-10 bg-[#BD6A3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#A85A2F] transition"
          >
            Explore Menu
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Benefits */}

        <div className="grid md:grid-cols-3 gap-6 mt-20">

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <Pizza
              className="mx-auto text-[#BD6A3C]"
              size={34}
            />

            <h3 className="font-bold text-xl mt-4">
              Fresh Ingredients
            </h3>

            <p className="mt-2 text-gray-500">
              Every pizza is prepared using premium ingredients.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <Truck
              className="mx-auto text-[#BD6A3C]"
              size={34}
            />

            <h3 className="font-bold text-xl mt-4">
              Fast Delivery
            </h3>

            <p className="mt-2 text-gray-500">
              Hot pizzas delivered straight to your doorstep.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 text-center">

            <Clock
              className="mx-auto text-[#BD6A3C]"
              size={34}
            />

            <h3 className="font-bold text-xl mt-4">
              Ready in Minutes
            </h3>

            <p className="mt-2 text-gray-500">
              Freshly baked and ready to enjoy quickly.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default EmptyCart;