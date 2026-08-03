import { Star } from "lucide-react";
import { Link } from "react-router-dom";
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
}

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const startingPrice =
    pizza.sizes.length > 0 ? pizza.sizes[0].price : 0;

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">

      <div className="overflow-hidden">
        <img
           src={`${IMAGE_URL}${pizza.image}`}
          alt={pizza.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h3 className="text-xl font-bold">
            {pizza.name}
          </h3>

          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-sm">
              {pizza.rating}
            </span>
          </div>

        </div>

        <p className="text-gray-500 mt-2">
          {pizza.category}
        </p>

        <div className="flex justify-between items-center mt-5">

          <p className="text-2xl font-bold text-[#BD6A3C]">
            ₹{startingPrice}
          </p>

          <Link
            to={`/pizza/${pizza._id}`}
            className="bg-[#BD6A3C] text-white px-5 py-2 rounded-full hover:bg-[#9f5730]"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default PizzaCard;