import { Link } from "react-router-dom";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";

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
    <div className="sticky top-28 h-fit rounded-3xl border border-[#E7DED3] bg-white p-8 shadow-xl">

      <h2 className="mb-8 text-3xl font-black text-[#2E2B27]">
        Order Summary
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">
            ₹{subtotal}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-semibold">
            ₹{delivery}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>GST (5%)</span>
          <span className="font-semibold">
            ₹{gst}
          </span>
        </div>

        <div className="border-t border-dashed border-[#E7DED3] pt-5">

          <div className="flex items-center justify-between">

            <span className="text-2xl font-black text-[#2E2B27]">
              Total
            </span>

            <span className="text-3xl font-black text-[#BD6A3C]">
              ₹{total}
            </span>

          </div>

        </div>

      </div>

      <Link
        to="/checkout"
        className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#BD6A3C] text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#A85A2F]"
      >
        <CreditCard size={20} />
        Proceed to Checkout
      </Link>

      <div className="mt-8 space-y-4 rounded-2xl bg-[#FAF7F2] p-5">

        <div className="flex items-center gap-3 text-gray-700">
          <Truck size={18} className="text-[#BD6A3C]" />
          <div>
            <p className="font-semibold">
              Fast Delivery
            </p>
            <p className="text-sm text-gray-500">
              Estimated arrival in 20–30 minutes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <ShieldCheck size={18} className="text-green-600" />
          <div>
            <p className="font-semibold">
              Secure Payment
            </p>
            <p className="text-sm text-gray-500">
              100% safe and encrypted checkout
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CartSummary;