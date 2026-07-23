import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

interface Props {
  price: number;
  quantity: number;
  total: number;
  pizzaId: string;
  size: string;
}

const PriceCard = ({
  price,
  quantity,
  total,
  pizzaId,
  size,
}: Props) => {
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    try {
      await addItem(pizzaId, size, quantity);

      alert("🍕 Pizza added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add pizza.");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7DED3] shadow-lg p-8">

      <div className="flex justify-between items-center mb-5">
        <span className="text-lg text-gray-600">
          Price
        </span>

        <span className="text-3xl font-black text-[#BD6A3C]">
          ₹{price}
        </span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <span className="text-lg text-gray-600">
          Quantity
        </span>

        <span className="font-bold text-xl">
          {quantity}
        </span>
      </div>

      <div className="border-t border-[#E7DED3] pt-6 flex justify-between items-center">

        <span className="text-xl font-bold">
          Total
        </span>

        <span className="text-4xl font-black text-[#2E2B27]">
          ₹{total}
        </span>

      </div>

      <button
        onClick={handleAddToCart}
        className="mt-8 w-full h-14 rounded-full bg-[#BD6A3C] hover:bg-[#A85A2F] text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]"
      >
        <ShoppingCart size={20} />
        Add To Cart
      </button>

    </div>
  );
};

export default PriceCard;