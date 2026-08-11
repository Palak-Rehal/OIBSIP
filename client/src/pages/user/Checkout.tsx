import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Wallet,
  ShieldCheck,
  Clock,
  ChevronLeft,
  Pizza as PizzaIcon,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";
import toast from "react-hot-toast";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../api/paymentApi";

const initialForm = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

type FormErrors = Partial<
  Record<keyof typeof initialForm, string>
>;

const Checkout = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const selectedItemId = searchParams.get("itemId");

  const { cart } = useCart();

  const [loading, setLoading] = useState(false);

  const [payment, setPayment] = useState("cod");

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState<FormErrors>({});

  // =====================================================
  // SELECT ONLY THE ITEM BEING CHECKED OUT
  // =====================================================

  const selectedItem = selectedItemId
    ? cart.find((item) => item._id === selectedItemId)
    : null;

  // =====================================================
  // IMPORTANT
  // If itemId exists → checkout only that item.
  // Otherwise → checkout entire cart.
  // =====================================================

  const checkoutItems = selectedItem
    ? [selectedItem]
    : cart;

  // =====================================================
  // TOTALS
  // =====================================================

  const subtotal = checkoutItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + delivery + gst;

  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const next: FormErrors = {};

    if (!form.fullName.trim()) {
      next.fullName =
        "Enter the receiver's name";
    }

    if (!/^\d{10}$/.test(form.phone.trim())) {
      next.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!form.address.trim()) {
      next.address =
        "Street address is required";
    }

    if (!form.city.trim()) {
      next.city = "City is required";
    }

    if (!form.state.trim()) {
      next.state = "State is required";
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      next.pincode =
        "Enter a valid 6-digit PIN code";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async () => {
    if (!validate()) {
      toast.error(
        "Please fix the highlighted fields."
      );
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("No items selected for checkout.");
      navigate("/cart");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // CREATE ORDER
      // =================================================

      const orderRes = await createOrder({
        deliveryAddress: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },

        paymentMethod:
          payment === "cod"
            ? "COD"
            : "Razorpay",

        // IMPORTANT:
        // Tell backend exactly which cart item
        // should become the order.
        cartItemId: selectedItemId || undefined,
      });

      if (!orderRes.data.success) {
        setLoading(false);

        toast.error(
          orderRes.data.message ||
            "Unable to place order."
        );

        return;
      }

      const orderId =
        orderRes.data.order?._id;

      if (!orderId) {
        setLoading(false);

        toast.error(
          "Order ID was not returned by the server."
        );

        return;
      }

      // =================================================
      // COD
      // =================================================

      if (payment === "cod") {
        setLoading(false);

        navigate("/order-success", {
          state: {
            orderId,
          },
        });

        return;
      }

      // =================================================
      // ONLINE PAYMENT
      // =================================================

      const paymentRes =
        await createPaymentOrder(orderId);

      if (!paymentRes.data.success) {
        setLoading(false);

        toast.error(
          paymentRes.data.message ||
            "Unable to start online payment."
        );

        return;
      }

      const razorpayOrder =
        paymentRes.data.paymentOrder;

      if (!razorpayOrder?.id) {
        setLoading(false);

        toast.error(
          "Razorpay order was not created."
        );

        return;
      }

      // =================================================
      // RAZORPAY KEY
      // =================================================

      const razorpayKey =
        import.meta.env
          .VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        setLoading(false);

        toast.error(
          "Razorpay key is missing."
        );

        return;
      }

      // =================================================
      // RAZORPAY SDK
      // =================================================

      if (!window.Razorpay) {
        setLoading(false);

        toast.error(
          "Razorpay is not loaded. Please refresh."
        );

        return;
      }

      // =================================================
      // RAZORPAY OPTIONS
      // =================================================

      const options = {
        key: razorpayKey,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency || "INR",

        name: "PizzaHub",

        description:
          "Pizza Order Payment",

        order_id:
          razorpayOrder.id,

        prefill: {
          name: form.fullName,
          contact: form.phone,
        },

        theme: {
          color: "#D8531F",
        },

        retry: {
          enabled: false,
        },

        handler: async (
          response: any
        ) => {
          try {
            const verifyRes =
              await verifyPayment({
                orderId,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              });

            if (!verifyRes.data.success) {
              setLoading(false);

              toast.error(
                verifyRes.data.message ||
                  "Payment verification failed."
              );

              return;
            }

            setLoading(false);

            navigate("/order-success", {
              state: {
                orderId,
              },
            });

          } catch (error: any) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              error
            );

            setLoading(false);

            toast.error(
              error?.response?.data?.message ||
                "Payment verification failed."
            );
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);

            toast(
              "Payment cancelled.",
              {
                icon: "⚠️",
              }
            );
          },
        },
      };

      // =================================================
      // OPEN RAZORPAY
      // =================================================

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response: any) => {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response
          );

          setLoading(false);

          toast.error(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();

    } catch (error: any) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );

      setLoading(false);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to place order."
      );
    }
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cart.length === 0) {
    return (
      <section className="min-h-screen bg-[#F7F3EC] py-16 px-5">
        <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-10 shadow-sm">

          <PizzaIcon
            size={50}
            className="mx-auto text-[#D8531F]"
          />

          <h1 className="text-2xl font-black text-[#22281F] mt-5">
            Your cart is empty
          </h1>

          <p className="text-gray-500 mt-2">
            Add a pizza to your cart before checking out.
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="mt-7 h-12 px-8 rounded-full bg-[#D8531F] text-white font-bold"
          >
            Browse Menu
          </button>

        </div>
      </section>
    );
  }

  // =====================================================
  // SELECTED ITEM WAS REMOVED
  // =====================================================

  if (selectedItemId && !selectedItem) {
    return (
      <section className="min-h-screen bg-[#F7F3EC] py-16 px-5">
        <div className="max-w-xl mx-auto text-center bg-white rounded-3xl p-10 shadow-sm">

          <h1 className="text-2xl font-black">
            Item no longer available
          </h1>

          <p className="text-gray-500 mt-2">
            This cart item may have been removed.
          </p>

          <button
            onClick={() => navigate("/cart")}
            className="mt-7 px-7 py-3 rounded-full bg-[#D8531F] text-white font-bold"
          >
            Back to Cart
          </button>

        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="min-h-screen bg-[#F7F3EC] py-8 px-5">

      <div className="max-w-6xl mx-auto">

        {/* TOP */}

        <div className="flex items-center justify-between mb-7">

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#D8531F]"
          >
            <ChevronLeft size={17} />
            Back to cart
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-bold">

            <span className="text-green-600">
              ✓ Cart
            </span>

            <span className="text-gray-300">
              →
            </span>

            <span className="text-[#D8531F]">
              ② Checkout
            </span>

            <span className="text-gray-300">
              →
            </span>

            <span className="text-gray-400">
              ③ Confirmation
            </span>

          </div>

        </div>

        <div className="mb-7">

          <h1 className="text-3xl md:text-4xl font-black text-[#22281F]">
            Checkout
          </h1>

          <p className="text-gray-500 mt-1">
            {selectedItem
              ? "You're checking out this pizza only."
              : "Review your order before placing it."}
          </p>

        </div>

        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-7">

          {/* LEFT */}

          <div className="space-y-6">

            {/* ADDRESS */}

            <div className="bg-white rounded-3xl border border-[#E7DED3] p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-[#FCE4D6] flex items-center justify-center">
                  <MapPin
                    size={19}
                    className="text-[#D8531F]"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-lg">
                    Delivery Address
                  </h2>

                  <p className="text-xs text-gray-400">
                    Where should we deliver?
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <FieldWithLabel
                  label="Full Name"
                  error={errors.fullName}
                >
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={inputClass(
                      !!errors.fullName
                    )}
                  />
                </FieldWithLabel>

                <FieldWithLabel
                  label="Phone"
                  error={errors.phone}
                >
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit phone number"
                    className={inputClass(
                      !!errors.phone
                    )}
                  />
                </FieldWithLabel>

                <FieldWithLabel
                  label="Address"
                  error={errors.address}
                >
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House no., street, locality"
                    className={inputClass(
                      !!errors.address
                    )}
                  />
                </FieldWithLabel>

                <div className="grid md:grid-cols-2 gap-4">

                  <FieldWithLabel
                    label="City"
                    error={errors.city}
                  >
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      className={inputClass(
                        !!errors.city
                      )}
                    />
                  </FieldWithLabel>

                  <FieldWithLabel
                    label="State"
                    error={errors.state}
                  >
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      className={inputClass(
                        !!errors.state
                      )}
                    />
                  </FieldWithLabel>

                </div>

                <div className="max-w-[220px]">

                  <FieldWithLabel
                    label="PIN Code"
                    error={errors.pincode}
                  >
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN"
                      className={inputClass(
                        !!errors.pincode
                      )}
                    />
                  </FieldWithLabel>

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="bg-white rounded-3xl border border-[#E7DED3] p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-[#FCE4D6] flex items-center justify-center">

                  <CreditCard
                    size={19}
                    className="text-[#D8531F]"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-lg">
                    Payment Method
                  </h2>

                  <p className="text-xs text-gray-400">
                    Choose your payment option
                  </p>

                </div>

              </div>

              <div className="space-y-3">

                <PaymentOption
                  value="cod"
                  selected={payment}
                  onChange={setPayment}
                  icon={
                    <Wallet
                      size={19}
                      className="text-[#D8531F]"
                    />
                  }
                  title="Cash on Delivery"
                  description="Pay when your pizza arrives"
                />

                <PaymentOption
                  value="online"
                  selected={payment}
                  onChange={setPayment}
                  icon={
                    <CreditCard
                      size={19}
                      className="text-[#D8531F]"
                    />
                  }
                  title="Pay Online"
                  description="UPI, card or netbanking"
                />

              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">

                <ShieldCheck size={14} />

                Secure payment & protected checkout

              </div>

            </div>

          </div>

          {/* RIGHT SUMMARY */}

          <div className="bg-white rounded-3xl border border-[#E7DED3] p-6 shadow-sm lg:sticky lg:top-24 h-fit">

            <h2 className="text-xl font-black text-[#22281F]">
              Order Summary
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {checkoutItems.length} item
              {checkoutItems.length > 1 ? "s" : ""}
            </p>

            <div className="mt-5 space-y-4">

              {checkoutItems.map((item) => {

                const name =
                  item.isCustomized
                    ? item.customName ||
                      "Custom Pizza"
                    : item.pizza?.name ||
                      "Pizza";

                const image =
                  item.pizza?.image;

                return (
                  <div
                    key={item._id}
                    className="flex items-center gap-3"
                  >

                    <div className="w-14 h-14 rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 flex items-center justify-center">

                      {image ? (
                        <img
                          src={
                            image.startsWith("http")
                              ? image
                              : `http://localhost:5000${image}`
                          }
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PizzaIcon
                          size={21}
                          className="text-[#D8531F]"
                        />
                      )}

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-bold text-sm truncate">
                        {name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {item.size}
                        {" · "}
                        Qty {item.quantity}
                      </p>

                    </div>

                    <span className="font-bold text-sm">
                      ₹{item.price * item.quantity}
                    </span>

                  </div>
                );
              })}

            </div>

            <hr className="my-5 border-[#F1EAE0]" />

            <div className="space-y-3 text-sm">

              <SummaryRow
                label="Subtotal"
                value={`₹${subtotal}`}
              />

              <SummaryRow
                label="Delivery"
                value={`₹${delivery}`}
              />

              <SummaryRow
                label="GST (5%)"
                value={`₹${gst}`}
              />

            </div>

            <hr className="my-5 border-[#F1EAE0]" />

            <div className="flex justify-between text-xl font-black">

              <span>Total</span>

              <span className="text-[#D8531F]">
                ₹{total}
              </span>

            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="
                mt-6
                w-full
                h-13
                py-3.5
                rounded-2xl
                bg-[#D8531F]
                text-white
                font-bold
                hover:bg-[#B8431A]
                transition
                disabled:opacity-50
                shadow-[0_8px_24px_rgba(216,83,31,0.25)]
              "
            >
              {loading
                ? "Processing..."
                : `Place Order · ₹${total}`}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">

              <Clock size={13} />

              Estimated delivery 30–40 min

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

// =====================================================
// COMPONENTS
// =====================================================

const inputClass = (
  hasError: boolean
) =>
  "w-full h-11 rounded-xl border px-4 text-sm outline-none transition focus:ring-2 focus:ring-[#D8531F]/15 " +
  (hasError
    ? "border-red-400"
    : "border-gray-200 focus:border-[#D8531F]");

const FieldWithLabel = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>

    <label className="block text-xs font-bold text-gray-600 mb-1.5">
      {label}
    </label>

    {children}

    {error && (
      <p className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}

  </div>
);

const PaymentOption = ({
  value,
  selected,
  onChange,
  icon,
  title,
  description,
}: {
  value: string;
  selected: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <label
    className={`
      flex items-center gap-3
      p-4 rounded-2xl border-2
      cursor-pointer transition
      ${
        selected === value
          ? "border-[#D8531F] bg-[#FFF6EF]"
          : "border-gray-200 hover:border-gray-300"
      }
    `}
  >

    <input
      type="radio"
      name="payment"
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      className="accent-[#D8531F]"
    />

    <div className="w-9 h-9 rounded-full bg-[#FCE4D6] flex items-center justify-center">
      {icon}
    </div>

    <div>

      <p className="font-bold text-sm text-[#22281F]">
        {title}
      </p>

      <p className="text-xs text-gray-400">
        {description}
      </p>

    </div>

  </label>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between">

    <span className="text-gray-500">
      {label}
    </span>

    <span className="font-semibold text-[#22281F]">
      {value}
    </span>

  </div>
);

export default Checkout;