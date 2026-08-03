import { FiPercent, FiTruck, FiGift } from "react-icons/fi";

const Offers = () => {
  const offers = [
    {
      icon: <FiPercent />,
      title: "50% Off on First Order",
      description:
        "Enjoy a delicious pizza experience with an exclusive discount on your first purchase.",
      code: "WELCOME50",
    },
    {
      icon: <FiTruck />,
      title: "Free Delivery",
      description:
        "Get free delivery on orders above ₹499. Hot pizza delivered to your doorstep.",
      code: "FREEDEL",
    },
    {
      icon: <FiGift />,
      title: "Combo Offers",
      description:
        "Grab exciting pizza combos with sides and beverages at special prices.",
      code: "COMBO25",
    },
  ];

  return (
    <section className="min-h-screen bg-[#fffaf4] pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-5xl font-bold text-[#2b2118]">
          Special <span className="text-[#d97745]">Offers</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Enjoy amazing deals and delicious pizzas at unbeatable prices.
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition"
            >

              <div className="text-4xl text-[#d97745] flex justify-center">
                {offer.icon}
              </div>

              <h2 className="text-2xl font-bold mt-5 text-[#2b2118]">
                {offer.title}
              </h2>

              <p className="text-gray-600 mt-3">
                {offer.description}
              </p>


              <div className="mt-6 bg-[#fff1e7] rounded-xl py-3 font-bold text-[#d97745]">
                Code: {offer.code}
              </div>

              <button className="mt-6 bg-[#d97745] text-white px-6 py-3 rounded-full hover:bg-[#c56535] transition">
                Order Now
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Offers;