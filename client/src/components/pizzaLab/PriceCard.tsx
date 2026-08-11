import { motion } from "framer-motion";
import { IndianRupee, ShoppingCart } from "lucide-react";

interface PriceCardProps {
  basePrice: number;
  crustPrice?: number;
  cheesePrice?: number;
  saucePrice?: number;
  toppingsPrice?: number;
  onAddToCart: () => void;
}

const PriceCard = ({
  basePrice,
  crustPrice = 0,
  cheesePrice = 0,
  saucePrice = 0,
  toppingsPrice = 0,
  onAddToCart,
}: PriceCardProps) => {

  const total =
    basePrice +
    crustPrice +
    cheesePrice +
    saucePrice +
    toppingsPrice;


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}

      className="
        bg-white
        rounded-3xl
        border
        border-orange-100
        shadow-xl
        p-5
        sticky
        bottom-4
      "
    >

      <div className="
        flex
        items-center
        justify-between
        mb-4
      ">

        <h2 className="
          font-bold
          text-lg
          text-gray-800
        ">
          Total Price
        </h2>

        <div className="
          flex
          items-center
          text-orange-600
          font-bold
          text-xl
        ">
          <IndianRupee size={18}/>
          {total}
        </div>

      </div>


      <div className="
        space-y-2
        text-sm
        text-gray-600
      ">

        <div className="flex justify-between">
          <span>Pizza</span>
          <span>₹{basePrice}</span>
        </div>


        <div className="flex justify-between">
          <span>Crust</span>
          <span>₹{crustPrice}</span>
        </div>


        <div className="flex justify-between">
          <span>Cheese</span>
          <span>₹{cheesePrice}</span>
        </div>


        <div className="flex justify-between">
          <span>Sauce</span>
          <span>₹{saucePrice}</span>
        </div>


        <div className="flex justify-between">
          <span>Toppings</span>
          <span>₹{toppingsPrice}</span>
        </div>

      </div>



      <button
        onClick={onAddToCart}

        className="
          mt-5
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-orange-500
          hover:bg-orange-600
          text-white
          py-3
          rounded-2xl
          font-semibold
          transition
          shadow-lg
        "
      >

        <ShoppingCart size={20}/>

        Add To Cart

      </button>


    </motion.div>
  );
};


export default PriceCard;