import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

const Cart = () => {
  const {
    cart,
    loading,
    fetchCart,
  } = useCart();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + delivery + gst;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading Cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center gap-3 mb-10">
          <ShoppingCart size={32} />
          <h1 className="text-4xl font-black">
            Shopping Cart
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          <div className="space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                refreshCart={fetchCart}
              />
            ))}
          </div>

          <CartSummary
            subtotal={subtotal}
            delivery={delivery}
            gst={gst}
            total={grandTotal}
          />

        </div>

        <div className="mt-10">
          <Link
            to="/menu"
            className="font-semibold text-[#BD6A3C] hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Cart;