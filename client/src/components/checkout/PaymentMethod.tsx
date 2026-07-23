import { CreditCard, Wallet } from "lucide-react";

interface Props {
  payment: string;
  setPayment: (value: string) => void;
}

const PaymentMethod = ({ payment, setPayment }: Props) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-[#E8DED3] p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className={`flex items-center justify-between border rounded-2xl p-5 cursor-pointer transition ${payment === "COD" ? "border-[#BD6A3C] bg-[#FFF5EE]" : "border-gray-200"}`}>
          <div className="flex items-center gap-4">
            <Wallet className="text-[#BD6A3C]" />
            <div>
              <p className="font-semibold">Cash On Delivery</p>
              <p className="text-sm text-gray-500">
                Pay when your pizza arrives.
              </p>
            </div>
          </div>

          <input
            type="radio"
            checked={payment === "COD"}
            onChange={() => setPayment("COD")}
          />
        </label>

        <label className={`flex items-center justify-between border rounded-2xl p-5 cursor-pointer transition ${payment === "ONLINE" ? "border-[#BD6A3C] bg-[#FFF5EE]" : "border-gray-200"}`}>
          <div className="flex items-center gap-4">
            <CreditCard className="text-[#7C9473]" />
            <div>
              <p className="font-semibold">
                Credit / Debit Card
              </p>
              <p className="text-sm text-gray-500">
                Razorpay / Stripe (Coming Soon)
              </p>
            </div>
          </div>

          <input
            type="radio"
            checked={payment === "ONLINE"}
            onChange={() => setPayment("ONLINE")}
          />
        </label>

      </div>

    </div>
  );
};

export default PaymentMethod;