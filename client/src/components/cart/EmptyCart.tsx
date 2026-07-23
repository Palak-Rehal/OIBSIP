import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">

      <div className="text-center max-w-md">

        <div className="w-28 h-28 mx-auto rounded-full bg-[#BD6A3C]/10 flex items-center justify-center">
          <ShoppingCart size={52} className="text-[#BD6A3C]" />
        </div>

        <h1 className="mt-8 text-4xl font-black text-[#2E2B27]">
          Your Cart is Empty
        </h1>

        <p className="mt-4 text-gray-500">
          Looks like you haven't added any delicious pizzas yet.
        </p>

        <Link
          to="/menu"
          className="inline-flex items-center justify-center mt-8 h-14 px-8 rounded-full bg-[#BD6A3C] text-white font-bold hover:bg-[#A85A2F] transition"
        >
          Explore Menu
        </Link>

      </div>

    </div>
  );
};

export default EmptyCart;