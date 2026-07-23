import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyOrders = () => {
  return (
    <div className="text-center py-28">

      <ShoppingBag
        size={80}
        className="mx-auto text-[#BD6A3C]"
      />

      <h2 className="mt-6 text-3xl font-black text-[#2E2B27]">
        No Orders Yet
      </h2>

      <p className="mt-4 text-gray-500">
        Start ordering delicious pizzas.
      </p>

      <Link
        to="/menu"
        className="inline-flex mt-8 px-8 h-14 items-center rounded-full bg-[#BD6A3C] text-white font-bold hover:bg-[#A85A2F]"
      >
        Browse Menu
      </Link>

    </div>
  );
};

export default EmptyOrders;