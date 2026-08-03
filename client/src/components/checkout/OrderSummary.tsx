import { ShoppingBag, Truck, Receipt, BadgeIndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
const IMAGE_URL = "http://localhost:5000";

interface CartItem {
  _id: string;
  quantity: number;
  size: string;
  price: number;
  pizza: {
    name: string;
    image: string;
  };
}

interface Props {
  cart: CartItem[];
  subtotal: number;
  delivery: number;
  gst: number;
  total: number;
  onPlaceOrder: () => void;
  loading: boolean;
}

const OrderSummary = ({
  cart,
  subtotal,
  delivery,
  gst,
  total,
  onPlaceOrder,
  loading,
}: Props) => {
  return (
    <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-[#E7DED3] p-7">

      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="text-[#BD6A3C]" size={24} />
        <h2 className="text-2xl font-bold text-[#2E2B27]">
          Order Summary
        </h2>
      </div>

      <div className="space-y-5 max-h-[320px] overflow-y-auto pr-1">

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4"
          >
            <img
              src={`${IMAGE_URL}${item.pizza.image}`}
              alt={item.pizza.name}
              className="w-16 h-16 rounded-2xl object-cover border"
            />

            <div className="flex-1">

              <h3 className="font-semibold text-[#2E2B27]">
                {item.pizza.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.size} × {item.quantity}
              </p>

            </div>

            <span className="font-bold text-[#BD6A3C]">
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

      </div>

      <hr className="my-6" />

      <div className="space-y-4 text-[#2E2B27]">

        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            <Receipt size={18} />
            Subtotal
          </span>

          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2">
            <Truck size={18} />
            Delivery
          </span>

          <span>₹{delivery}</span>

        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2">
            <BadgeIndianRupee size={18} />
            GST (5%)
          </span>

          <span>₹{gst}</span>

        </div>

      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-7">

        <span className="text-xl font-bold">
          Grand Total
        </span>

        <span className="text-3xl font-black text-[#BD6A3C]">
          ₹{total}
        </span>

      </div>

      <button
        onClick={onPlaceOrder}
        disabled={loading}
        className="w-full h-14 rounded-full bg-[#BD6A3C] hover:bg-[#A6592E] text-white font-bold transition duration-300 disabled:opacity-60"
      >
        {loading ? "Placing Order..." : "Place Order 🍕"}
      </button>

      <Link
        to="/cart"
        className="block text-center mt-5 text-[#BD6A3C] hover:underline font-semibold"
      >
        ← Back to Cart
      </Link>

    </div>
  );
};

export default OrderSummary;