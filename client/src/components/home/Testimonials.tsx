import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "The best pizza I've had in a long time! Fresh ingredients, crispy crust, and super fast delivery. Highly recommended.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Ordering from PizzaHub has become a weekend tradition. The quality is consistently amazing and the app is very easy to use.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul Kapoor",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Loved the Cheese Burst Pizza. It arrived hot, fresh and exactly as expected. Definitely ordering again.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#BD6A3C] font-semibold uppercase tracking-widest">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#2E2B27]">
            Loved By Thousands Of Pizza Lovers
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg">
            Our customers love our handcrafted pizzas, quick delivery,
            and unforgettable taste.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="
                bg-white
                rounded-[30px]
                p-8
                border
                border-[#E7DED3]
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 leading-8 text-lg">
                "{item.review}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4 mt-8">
                <img
                    src={item.image}
                      alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#BD6A3C]"
                />

                <div>
                  <h4 className="font-bold text-lg text-[#2E2B27]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <h3 className="text-4xl font-black text-[#BD6A3C]">10K+</h3>
            <p className="text-gray-500 mt-2">Happy Customers</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#BD6A3C]">50+</h3>
            <p className="text-gray-500 mt-2">Pizza Varieties</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#BD6A3C]">4.9★</h3>
            <p className="text-gray-500 mt-2">Average Rating</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#BD6A3C]">30 Min</h3>
            <p className="text-gray-500 mt-2">Average Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;