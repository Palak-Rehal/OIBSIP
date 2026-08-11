import {
  Star,
  ShoppingCart,
  Eye,
  Heart,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";

const IMAGE_URL = "http://localhost:5000";

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

  isFeatured?: boolean;
  isAvailable?: boolean;
  ingredients?: string[];
  description?: string;
}

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const { addItem } = useCart();

  const startingPrice =
    pizza.sizes?.length > 0 ? pizza.sizes[0].price : 0;

  const selectedSize =
    pizza.sizes?.length > 0 ? pizza.sizes[0].size : "Medium";

  const imageUrl = pizza.image
    ? pizza.image.startsWith("http")
      ? pizza.image
      : `${IMAGE_URL}${pizza.image.startsWith("/") ? "" : "/"}${pizza.image}`
    : "/images/pizza-placeholder.jpg";

  const handleAddToCart = async () => {
    try {
      if (pizza.isAvailable === false) {
        toast.error("This pizza is currently unavailable");
        return;
      }

      if (!pizza._id) {
        toast.error("Pizza ID is missing");
        return;
      }

      if (!pizza.sizes || pizza.sizes.length === 0) {
        toast.error("No size available for this pizza");
        return;
      }

      setAdding(true);

      await addItem(
        pizza._id,
        selectedSize,
        1
      );

      toast.success(`${pizza.name} added to cart`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Unable to add pizza to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        bg-white
        border border-[#EDE4D9]
        shadow-[0_8px_30px_rgba(75,50,30,0.08)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-[0_20px_45px_rgba(75,50,30,0.16)]
      "
    >
      {/* ================= IMAGE ================= */}

      <div className="relative h-56 overflow-hidden bg-[#FAF7F2]">

        <img
          src={imageUrl}
          alt={pizza.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
          onError={(event) => {
            event.currentTarget.src =
              "/images/pizza-placeholder.jpg";
          }}
        />

        {/* Image Gradient */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-black/35
            to-transparent
            pointer-events-none
          "
        />

        {/* Favourite */}

        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="
            absolute
            top-4
            right-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/90
            backdrop-blur-md
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
          "
        >
          <Heart
            size={18}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-[#555]"
            }
          />
        </button>

        {/* Rating */}

        <div
          className="
            absolute
            bottom-4
            right-4
            flex
            items-center
            gap-1
            rounded-full
            bg-white/95
            px-3
            py-1.5
            text-sm
            font-semibold
            shadow-md
            backdrop-blur-sm
          "
        >
          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-[#22281F]">
            {Number(pizza.rating || 0).toFixed(1)}
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-5">

        {/* Name + Category */}

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3
              className="
                truncate
                text-xl
                font-extrabold
                text-[#22281F]
                transition-colors
                duration-300
                group-hover:text-[#D8531F]
              "
            >
              {pizza.name}
            </h3>

            <span
              className="
                mt-1
                inline-block
                text-sm
                font-medium
                text-[#777]
              "
            >
              {pizza.category}
            </span>
          </div>
        </div>

        {/* Ingredients */}

        <p className="mt-3 min-h-[40px] text-sm leading-5 text-gray-500">
          {pizza.ingredients?.length
            ? pizza.ingredients.slice(0, 3).join(" • ")
            : pizza.description ||
              "Fresh ingredients, premium cheese & delicious toppings"}
        </p>

        {/* Availability */}

        <div className="mt-4">

          {pizza.isAvailable !== false ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
              <CheckCircle2 size={16} />
              Available
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
              <XCircle size={16} />
              Sold Out
            </div>
          )}
        </div>

        {/* Price */}

        <div className="mt-5 flex items-end justify-between">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Starting from
            </p>

            <p
              className="
                mt-1
                text-2xl
                font-black
                text-[#D8531F]
              "
            >
              ₹{startingPrice}
            </p>
          </div>

          {/* Size */}

          <div
            className="
              rounded-full
              bg-[#F7F5F0]
              px-3
              py-1.5
              text-xs
              font-semibold
              text-[#666]
            "
          >
            {selectedSize}
          </div>
        </div>

        {/* ================= BUTTONS ================= */}

        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* VIEW */}

          <Link
            to={`/pizza/${pizza._id}`}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-[#D8531F]
              bg-white
              text-sm
              font-bold
              text-[#D8531F]
              transition-all
              duration-300
              hover:bg-[#D8531F]
              hover:text-white
              hover:shadow-lg
            "
          >
            <Eye size={17} />
            View
          </Link>

          {/* ADD TO CART */}

          <button
            type="button"
            disabled={
              adding ||
              pizza.isAvailable === false
            }
            onClick={handleAddToCart}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#D8531F]
              text-sm
              font-bold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#B8431A]
              hover:shadow-xl
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ShoppingCart size={17} />

            {adding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;