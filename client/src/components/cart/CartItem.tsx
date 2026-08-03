import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
const IMAGE_URL = "http://localhost:5000";

interface Props {
  item: any;
  refreshCart: () => void;
}

const CartItem = ({ item }: Props) => {
  const { updateItem, removeItem } = useCart();

  const increase = async () => {
    try {
      await updateItem(item._id, item.quantity + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const decrease = async () => {
    if (item.quantity <= 1) return;

    try {
      await updateItem(item._id, item.quantity - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7DED3] shadow-md p-6 flex flex-col md:flex-row gap-6">

      <img
        src={`${IMAGE_URL}${item.pizza.image}`}
      alt={item.pizza.name}
        className="w-40 h-40 object-contain mx-auto md:mx-0"
      />

      <div className="flex-1">

        <h2 className="text-2xl font-bold text-[#2E2B27]">
          {item.pizza.name}
        </h2>

        <p className="mt-2 text-gray-500">
          Size : {item.size}
        </p>

        <p className="mt-3 text-xl font-bold text-[#BD6A3C]">
          ₹{item.price}
        </p>

        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={decrease}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#BD6A3C] hover:text-white transition"
          >
            <Minus size={18} />
          </button>

          <span className="text-lg font-bold">
            {item.quantity}
          </span>

          <button
            onClick={increase}
            className="w-10 h-10 rounded-full bg-[#BD6A3C] text-white flex items-center justify-center hover:bg-[#A85A2F] transition"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      <div className="flex flex-col justify-between items-end">

        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={22} />
        </button>

        <h2 className="text-2xl font-black text-[#2E2B27]">
          ₹{item.price * item.quantity}
        </h2>

      </div>

    </div>
  );
};

export default CartItem;