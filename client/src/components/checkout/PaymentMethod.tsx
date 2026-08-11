import { Wallet, CreditCard } from "lucide-react";

interface Props {
  payment: string;
  setPayment: (value: string) => void;
}

const PaymentMethod = ({
  payment,
  setPayment,
}: Props) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-[#E7DED3]">

      <h2 className="text-xl font-bold mb-5">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label
          className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition ${
            payment === "cod"
              ? "border-[#BD6A3C] bg-[#FFF7F2]"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />

          <Wallet className="text-[#BD6A3C]" />

          <div>
            <h3 className="font-semibold">
              Cash on Delivery
            </h3>

            <p className="text-sm text-gray-500">
              Pay when your pizza arrives.
            </p>
          </div>
        </label>

        <label
          className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition ${
            payment === "razorpay"
              ? "border-[#BD6A3C] bg-[#FFF7F2]"
              : "border-gray-200"
          }`}
        >
          <input
            type="radio"
            checked={payment === "razorpay"}
            onChange={() => setPayment("razorpay")}
          />

          <CreditCard className="text-[#BD6A3C]" />

          <div>
            <h3 className="font-semibold">
              Razorpay
            </h3>

            <p className="text-sm text-gray-500">
              UPI • Cards • Net Banking • Wallets
            </p>
          </div>
        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;