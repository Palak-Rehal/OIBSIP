import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Wallet } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";

const Checkout = () => {
  const navigate = useNavigate();

  const { cart, clear } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);

      const res = await createOrder({
        deliveryAddress: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        paymentMethod: form.paymentMethod,
      });

      if (res.data.success) {
        await clear();
        navigate("/order-success");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-4xl font-black text-[#2E2B27] mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-10">

          {/* Left Side */}
          <div className="bg-white rounded-3xl border border-[#E7DED3] shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-[#BD6A3C]" />
              <h2 className="text-2xl font-bold">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-5">

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full h-14 rounded-xl border border-gray-300 px-4 outline-none focus:border-[#BD6A3C]"
              />

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-6">
                Payment Method
              </h2>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-[#BD6A3C]">

                <input
                  type="radio"
                  checked={form.paymentMethod === "COD"}
                  onChange={() =>
                    setForm({
                      ...form,
                      paymentMethod: "COD",
                    })
                  }
                />

                <Wallet className="text-[#BD6A3C]" />

                <span className="font-semibold">
                  Cash On Delivery
                </span>

              </label>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-white rounded-3xl border border-[#E7DED3] shadow-lg p-8 h-fit sticky top-28">

            <h2 className="text-2xl font-black mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-3xl font-black">

              <span>Total</span>

              <span className="text-[#BD6A3C]">
                ₹{total}
              </span>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-8 w-full h-14 rounded-full bg-[#BD6A3C] hover:bg-[#A85A2F] disabled:bg-gray-400 text-white font-bold flex items-center justify-center gap-3 transition"
            >
              <CreditCard size={20} />

              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Checkout;