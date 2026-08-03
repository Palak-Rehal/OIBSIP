import { ShoppingCart, ArrowLeft } from "lucide-react";
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
      <section className="min-h-screen bg-[#FAF7F2] pt-32 flex items-center justify-center">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-[#BD6A3C] border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-6 text-lg font-semibold text-[#2E2B27]">
            Loading your cart...
          </p>

        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-5">

        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-5">

          <Link
            to="/"
            className="hover:text-[#BD6A3C]"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/menu"
            className="hover:text-[#BD6A3C]"
          >
            Menu
          </Link>

          <span className="mx-2">/</span>

          <span className="font-semibold text-[#BD6A3C]">
            Cart
          </span>

        </div>

        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-[#BD6A3C]/10 flex items-center justify-center">

              <ShoppingCart
                size={34}
                className="text-[#BD6A3C]"
              />

            </div>

            <div>

              <h1 className="text-4xl font-black text-[#2E2B27]">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-2">
                {cart.length} item{cart.length > 1 ? "s" : ""} in your cart
              </p>

            </div>

          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5D8C5] text-[#2E2B27] font-semibold hover:border-[#BD6A3C] hover:text-[#BD6A3C] transition"
          >

            <ArrowLeft size={18} />

            Continue Shopping

          </Link>

        </div>

        {/* Main Content */}

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* Cart Items */}

          <div className="space-y-6">

            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                refreshCart={fetchCart}
              />
            ))}

          </div>

          {/* Order Summary */}

          <div className="sticky top-28 h-fit">

            <CartSummary
              subtotal={subtotal}
              delivery={delivery}
              gst={gst}
              total={grandTotal}
            />

          </div>

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-16">

          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">

            <h3 className="font-bold text-lg text-[#2E2B27]">
              🚚 Fast Delivery
            </h3>

            <p className="mt-2 text-gray-500">
              Fresh pizza delivered hot within minutes.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">

            <h3 className="font-bold text-lg text-[#2E2B27]">
              🍕 Fresh Ingredients
            </h3>

            <p className="mt-2 text-gray-500">
              Prepared with premium cheese and authentic toppings.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">

            <h3 className="font-bold text-lg text-[#2E2B27]">
              🔒 Secure Checkout
            </h3>

            <p className="mt-2 text-gray-500">
              Safe and encrypted online payments.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;