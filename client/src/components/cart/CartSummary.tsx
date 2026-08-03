import { ArrowRight, BadgePercent, Truck } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  subtotal: number;
  delivery: number;
  gst: number;
  total: number;
}

const CartSummary = ({
  subtotal,
  delivery,
  gst,
  total,
}: Props) => {
  return (
    <div
      className="
        sticky
        top-28
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-[#EFE6DB]
        p-7
        h-fit
      "
    >
      {/* Heading */}

      <h2 className="text-2xl font-black text-[#2E2B27]">
        Order Summary
      </h2>

      <p className="text-gray-500 mt-2">
        Review your order before checkout.
      </p>

      {/* Coupon */}

      <div className="mt-8 bg-[#FFF5ED] rounded-2xl p-4 border border-[#F6D6C1]">

        <div className="flex items-center gap-3">

          <BadgePercent
            className="text-[#BD6A3C]"
            size={22}
          />

          <div>

            <h3 className="font-bold text-[#2E2B27]">
              Apply Coupon
            </h3>

            <p className="text-sm text-gray-500">
              Save more on today's order.
            </p>

          </div>

        </div>

      </div>

      {/* Price Details */}

      <div className="mt-8 space-y-5">

        <div className="flex justify-between">

          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-bold">
            ₹{subtotal}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="flex items-center gap-2 text-gray-600">

            <Truck size={17} />

            Delivery

          </span>

          <span className="font-bold">
            ₹{delivery}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-600">
            GST (5%)
          </span>

          <span className="font-bold">
            ₹{gst}
          </span>

        </div>

        <hr />

        <div className="flex justify-between">

          <span className="text-xl font-black">
            Total
          </span>

          <span className="text-2xl font-black text-[#BD6A3C]">
            ₹{total}
          </span>

        </div>

      </div>

      {/* Checkout */}

      <Link
        to="/checkout"
        className="
          mt-8
          w-full
          h-14
          rounded-full
          bg-[#BD6A3C]
          hover:bg-[#A95B32]
          transition
          text-white
          font-bold
          flex
          items-center
          justify-center
          gap-2
        "
      >
        Proceed to Checkout

        <ArrowRight size={18} />

      </Link>

      {/* Trust Badges */}

      <div className="mt-8 border-t pt-6">

        <div className="flex justify-between text-center">

          <div>

            <p className="font-bold text-[#2E2B27]">
              100%
            </p>

            <p className="text-xs text-gray-500">
              Secure
            </p>

          </div>

          <div>

            <p className="font-bold text-[#2E2B27]">
              30 min
            </p>

            <p className="text-xs text-gray-500">
              Delivery
            </p>

          </div>

          <div>

            <p className="font-bold text-[#2E2B27]">
              Fresh
            </p>

            <p className="text-xs text-gray-500">
              Handmade
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartSummary;