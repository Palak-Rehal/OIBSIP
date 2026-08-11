import { useState } from "react";
import { FiPercent, FiTruck, FiGift, FiCopy, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
 
const offers = [
  {
    icon: <FiPercent />,
    title: "50% Off on First Order",
    description:
      "Enjoy a delicious pizza experience with an exclusive discount on your first purchase.",
    code: "WELCOME50",
    tag: "New customers",
  },
  {
    icon: <FiTruck />,
    title: "Free Delivery",
    description:
      "Get free delivery on orders above ₹499. Hot pizza delivered to your doorstep.",
    code: "FREEDEL",
    tag: "Above ₹499",
  },
  {
    icon: <FiGift />,
    title: "Combo Offers",
    description:
      "Grab exciting pizza combos with sides and beverages at special prices.",
    code: "COMBO25",
    tag: "Combo only",
  },
];
 
const Offers = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
 
  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`Code "${code}" copied`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error("Couldn't copy — copy it manually instead");
    }
  };
 
  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
 
        {/* Compact hero */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-wider text-[#D8531F] uppercase">
            Limited time
          </span>
 
          <h1 className="text-4xl md:text-5xl font-black text-[#22281F] mt-2">
            Special <span className="text-[#D8531F]">Offers</span>
          </h1>
 
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Enjoy amazing deals and delicious pizzas at unbeatable prices.
          </p>
        </div>
 
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const isCopied = copiedCode === offer.code;
 
            return (
              <div
                key={offer.code}
                className="group relative bg-white rounded-[28px] border border-[#E7DED3] shadow-[0_2px_20px_rgba(34,40,31,0.05)] p-7 hover:shadow-[0_12px_32px_rgba(216,83,31,0.12)] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Corner tag */}
                <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wide text-[#5B8C5A] bg-[#5B8C5A]/10 px-2.5 py-1 rounded-full">
                  {offer.tag}
                </span>
 
                <div className="w-14 h-14 rounded-2xl bg-[#FCE4D6] flex items-center justify-center text-2xl text-[#D8531F]">
                  {offer.icon}
                </div>
 
                <h2 className="text-xl font-bold mt-5 text-[#22281F]">
                  {offer.title}
                </h2>
 
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {offer.description}
                </p>
 
                {/* Code — dashed coupon style */}
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="mt-6 w-full flex items-center justify-between gap-2 rounded-xl border-2 border-dashed border-[#D8531F]/30 bg-[#FFF6EF] py-3 px-4 font-bold text-[#D8531F] hover:border-[#D8531F] transition"
                >
                  <span className="text-sm tracking-wide">
                    {offer.code}
                  </span>
 
                  <span className="flex items-center gap-1 text-xs">
                    {isCopied ? (
                      <>
                        <FiCheck size={14} /> Copied
                      </>
                    ) : (
                      <>
                        <FiCopy size={14} /> Copy
                      </>
                    )}
                  </span>
                </button>
 
                <button
                  onClick={() => navigate("/menu")}
                  className="mt-4 w-full bg-[#22281F] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#D8531F] transition"
                >
                  Order Now
                </button>
              </div>
            );
          })}
        </div>
 
        {/* Fine print */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Codes apply automatically at checkout. Cannot be combined with
          other offers.
        </p>
 
      </div>
    </section>
  );
};
 
export default Offers;
