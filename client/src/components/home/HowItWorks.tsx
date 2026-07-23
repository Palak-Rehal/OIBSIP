import { Search, ChefHat, Bike, Smile } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse the menu", desc: "Pick your favorite from our handmade pizzas." },
  { icon: ChefHat, title: "We bake it fresh", desc: "Made to order in our wood-fired oven." },
  { icon: Bike, title: "Fast delivery", desc: "Out the door and to you in 20–25 minutes." },
  { icon: Smile, title: "Enjoy", desc: "Hot, fresh, and ready to devour." },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-14">
        <p className="text-[#5C7350] text-[13px] tracking-[0.2em] uppercase font-bold mb-3">
          How it works
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E2B27]">
          From oven to doorstep
        </h2>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6">
        {/* Connecting line - desktop only */}
        <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-[#E4DCCB]" />

        {steps.map(({ icon: Icon, title, desc }, i) => (
          <div key={title} className="relative flex flex-col items-center text-center">
            <div className="relative z-10 w-14 h-14 rounded-full bg-[#BD6A3C] flex items-center justify-center mb-5 shadow-[0_10px_25px_-8px_rgba(189,106,60,0.5)]">
              <Icon size={22} className="text-white" strokeWidth={1.8} />
            </div>
            <span className="text-[11px] font-bold text-[#BD6A3C] uppercase tracking-[0.1em] mb-1.5">
              Step {i + 1}
            </span>
            <h3 className="text-[15px] font-bold text-[#2E2B27] mb-1.5">{title}</h3>
            <p className="text-[13px] text-[#8A8477] leading-relaxed max-w-[180px]">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
