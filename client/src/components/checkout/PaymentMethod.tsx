import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle2,
} from "lucide-react";

const PaymentMethod = () => {
  const [method, setMethod] = useState("cod");

  const payments = [
    {
      id: "cod",
      title: "Cash on Delivery",
      description: "Pay when your order arrives.",
      icon: <Banknote size={24} />,
    },
    {
      id: "card",
      title: "Credit / Debit Card",
      description: "Visa, Mastercard, RuPay supported.",
      icon: <CreditCard size={24} />,
    },
    {
      id: "upi",
      title: "UPI / Wallet",
      description: "Google Pay, PhonePe, Paytm, BHIM.",
      icon: <Wallet size={24} />,
    },
  ];

  return (
    <div className="space-y-5">

      {payments.map((item) => (

        <label
          key={item.id}
          className={`
            relative
            flex
            items-center
            justify-between
            p-5
            rounded-2xl
            border-2
            cursor-pointer
            transition-all
            duration-300

            ${
              method === item.id
                ? "border-[#BD6A3C] bg-[#FFF7F2]"
                : "border-[#ECE5DA] bg-white hover:border-[#BD6A3C]"
            }
          `}
        >

          <div className="flex items-center gap-5">

            <div
              className={`
                w-14
                h-14
                rounded-2xl
                flex
                items-center
                justify-center

                ${
                  method === item.id
                    ? "bg-[#BD6A3C] text-white"
                    : "bg-[#F5F5F5] text-[#BD6A3C]"
                }
              `}
            >
              {item.icon}
            </div>

            <div>

              <h3 className="font-bold text-lg text-[#2E2B27]">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.description}
              </p>

            </div>

          </div>

          <div>

            <input
              type="radio"
              checked={method === item.id}
              onChange={() => setMethod(item.id)}
              className="hidden"
            />

            {method === item.id && (
              <CheckCircle2
                size={28}
                className="text-[#BD6A3C]"
              />
            )}

          </div>

        </label>

      ))}

      <div className="bg-[#FFF7F2] rounded-2xl p-5 mt-6">

        <h3 className="font-bold text-[#2E2B27]">
          Secure Payments
        </h3>

        <p className="text-gray-500 mt-2">
          All transactions are encrypted using industry-standard
          security. Your payment information is protected at every
          step.
        </p>

      </div>

    </div>
  );
};

export default PaymentMethod;