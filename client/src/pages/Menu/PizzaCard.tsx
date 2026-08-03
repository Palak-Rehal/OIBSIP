import {
  Star,
  ShoppingCart,
  Eye,
  Heart,
  Clock3,
  CheckCircle2,
  XCircle,
  Flame,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { Pizza } from "../../types/pizza";
const IMAGE_URL = "http://localhost:5000";
interface Props {
  pizza: Pizza;
}

const PizzaCard = ({ pizza }: Props) => {
  const [liked, setLiked] = useState(false);

  const startingPrice =
    pizza.sizes.length > 0 ? pizza.sizes[0].price : 0;

  return (
    <div
      className="
      group
      bg-gradient-to-b
      from-white
      to-[#FFF8F2]
      rounded-[30px]
      overflow-hidden
      border
      border-[#E7DED3]
      shadow-md
      hover:shadow-2xl
      transition-all
      duration-500
      hover:-translate-y-2
      "
    >
      {/* IMAGE */}

      <div className="relative bg-[#FAF7F2]">

        <img
          src={`${IMAGE_URL}${pizza.image}`}
          alt={pizza.name}
          className="
          w-full
          h-64
          object-contain
          p-6
          transition
          duration-500
          group-hover:scale-110
          "
        />

        {/* Favourite */}

        <button
          onClick={() => setLiked(!liked)}
          className="
          absolute
          top-4
          right-4
          w-10
          h-10
          rounded-full
          bg-white
          shadow-md
          flex
          items-center
          justify-center
          transition
          hover:scale-110
          "
        >
          <Heart
            size={18}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }
          />
        </button>

        {/* Featured */}

        {pizza.isFeatured && (

          <div
            className="
            absolute
            top-4
            left-4
            bg-[#BD6A3C]
            text-white
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            flex
            items-center
            gap-1
            "
          >
            <Flame size={14} />

            Bestseller

          </div>

        )}

      </div>

      {/* BODY */}

      <div className="p-6">

        <div className="flex justify-between">

          <h2 className="text-2xl font-black text-[#2E2B27]">

            {pizza.name}

          </h2>

          <div
            className="
            flex
            items-center
            gap-1
            bg-[#FFF5DD]
            px-3
            py-1
            rounded-full
            "
          >
            <Star
              size={16}
              className="fill-yellow-500 text-yellow-500"
            />

            <span className="font-semibold">

              {pizza.rating.toFixed(1)}

            </span>

          </div>

        </div>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2">

          {pizza.ingredients?.slice(0, 3).join(", ") ||
            "Fresh cheese, olives & premium toppings"}

        </p>

        <div className="flex gap-2 mt-5">

          <span
            className="
            bg-[#F5F5F5]
            px-3
            py-1
            rounded-full
            text-sm
            "
          >
            {pizza.category}
          </span>

          <span
            className="
            bg-[#EDF9F1]
            px-3
            py-1
            rounded-full
            text-sm
            flex
            items-center
            gap-1
            "
          >
            <Clock3 size={14} />

            20-30 min

          </span>

        </div>

        {/* Availability */}

        <div className="mt-5">

          {pizza.isAvailable !== false ? (

            <div className="flex items-center gap-2 text-green-600">

              <CheckCircle2 size={18} />

              <span className="font-semibold">

                Available

              </span>

            </div>

          ) : (

            <div className="flex items-center gap-2 text-red-500">

              <XCircle size={18} />

              <span className="font-semibold">

                Sold Out

              </span>

            </div>

          )}

        </div>

        {/* PRICE */}

        <div className="mt-6 flex justify-between items-end">

          <div>

            <p className="text-sm text-gray-400">

              Starting From

            </p>

            <h2 className="text-3xl font-black text-[#BD6A3C]">

              ₹{startingPrice}

            </h2>

          </div>

          <Link
            to={`/pizza/${pizza._id}`}
            className="
            w-12
            h-12
            rounded-full
            border
            border-[#E7DED3]
            flex
            items-center
            justify-center
            hover:bg-[#BD6A3C]
            hover:text-white
            transition
            "
          >
            <Eye size={20} />
          </Link>

        </div>

        {/* BUTTON */}

        <button
          className="
          mt-7
          w-full
          rounded-full
          h-14
          bg-gradient-to-r
          from-[#BD6A3C]
          to-[#A85A2F]
          text-white
          font-bold
          flex
          items-center
          justify-center
          gap-3
          transition
          duration-300
          hover:scale-[1.02]
          hover:shadow-xl
          "
        >
          <ShoppingCart size={20} />

          Add To Cart

        </button>

      </div>

    </div>
  );
};

export default PizzaCard;