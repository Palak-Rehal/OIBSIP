import { TicketPercent, Clock3, Gift } from "lucide-react";

const offers = [
  {
    title: "50% OFF",
    subtitle: "On Your First Order",
    description: "Use coupon NEW50",
    icon: TicketPercent,
    bg: "bg-[#FDE9DD]",
    color: "text-[#BD6A3C]",
  },
  {
    title: "Free Delivery",
    subtitle: "Orders Above ₹499",
    description: "Limited Time Offer",
    icon: Clock3,
    bg: "bg-[#EDF6EA]",
    color: "text-[#5B8C5A]",
  },
  {
    title: "Buy 1 Get 1",
    subtitle: "Every Wednesday",
    description: "Applicable on Medium Pizza",
    icon: Gift,
    bg: "bg-[#FFF4DA]",
    color: "text-[#D18B00]",
  },
];

const Offers = () => {
  return (
    <section className="bg-[#FAF7F2] py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2E2B27]">
            Today's Offers
          </h2>

          <p className="text-gray-500 mt-3">
            Save more on every delicious bite.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {offers.map((offer) => {
            const Icon = offer.icon;

            return (
              <div
                key={offer.title}
                className={`${offer.bg}
                rounded-3xl
                p-8
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2`}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-white flex items-center justify-center ${offer.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-[#2E2B27]">
                  {offer.title}
                </h3>

                <p className="mt-2 font-semibold text-lg">
                  {offer.subtitle}
                </p>

                <p className="text-gray-500 mt-2">
                  {offer.description}
                </p>

                <button
                  className="mt-6 bg-[#2E2B27] text-white px-6 py-3 rounded-full hover:bg-[#BD6A3C] transition"
                >
                  Order Now
                </button>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Offers;