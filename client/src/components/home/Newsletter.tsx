import { Mail, Send } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    alert(`Subscribed successfully: ${email}`);
    setEmail("");
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-[#BD6A3C] via-[#A85A2F] to-[#8F4724]">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-[36px] shadow-2xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* Left */}
            <div className="p-12 lg:p-16 flex flex-col justify-center">

              <div className="w-16 h-16 rounded-full bg-[#F6E7DD] flex items-center justify-center mb-6">
                <Mail className="text-[#BD6A3C]" size={30} />
              </div>

              <span className="text-[#BD6A3C] font-semibold uppercase tracking-widest">
                Stay Updated
              </span>

              <h2 className="text-4xl lg:text-5xl font-black text-[#2E2B27] mt-4 leading-tight">
                Get Delicious Deals Delivered
                <br />
                Straight To Your Inbox 🍕
              </h2>

              <p className="mt-6 text-gray-600 text-lg leading-8">
                Subscribe to receive exclusive discounts, limited-time offers,
                new pizza launches and exciting rewards every week.
              </p>

            </div>

            {/* Right */}
            <div className="bg-[#FAF7F2] p-12 lg:p-16 flex items-center">

              <form
                onSubmit={handleSubmit}
                className="w-full space-y-6"
              >
                <div>
                  <label className="font-semibold text-[#2E2B27] mb-3 block">
                    Email Address
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      border
                      border-[#E7DED3]
                      bg-white
                      px-5
                      outline-none
                      focus:ring-2
                      focus:ring-[#BD6A3C]
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-[#BD6A3C]
                    to-[#A85A2F]
                    text-white
                    font-bold
                    flex
                    items-center
                    justify-center
                    gap-3
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                    shadow-lg
                  "
                >
                  <Send size={20} />
                  Subscribe Now
                </button>

                <p className="text-sm text-center text-gray-500">
                  No spam. Unsubscribe anytime.
                </p>

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;