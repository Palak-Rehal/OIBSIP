import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

interface AddToCartButtonProps {
  totalPrice: number;
  selectedSize: {
    name: string;
    price: number;
  };
  selectedCrust: {
    name: string;
    price: number;
  };
  selectedSauce: {
    name: string;
    price: number;
  };
  selectedCheese: {
    name: string;
    price: number;
  };
  selectedToppings: string[];
}

const AddToCartButton = ({
  totalPrice,
  selectedSize,
  selectedCrust,
  selectedSauce,
  selectedCheese,
  selectedToppings,
}: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    try {
      await addItem(
        "",
        selectedSize.name,
        1,
        {
          name: "Customized Pizza",
          crust: selectedCrust.name,
          sauce: selectedSauce.name,
          cheese: selectedCheese.name,
          toppings: selectedToppings,
          price: totalPrice,
          isCustomized: true,
        }
      );
    } catch (error) {
      console.log("Add cart error:", error);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={handleAddToCart}
      className="
        w-full
        flex items-center justify-center gap-3
        bg-[#E5501C]
        hover:bg-[#C23F14]
        text-[#1C1712]
        py-4
        rounded-2xl
        font-black
        shadow-[0_16px_36px_rgba(229,80,28,0.35)]
        transition
      "
    >
      <ShoppingCart size={20} />
      Add to Cart · ₹{totalPrice}
    </motion.button>
  );
};

export default AddToCartButton;