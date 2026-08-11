import { Pizza, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = ["Home", "Menu", "Offers", "Contact"];
  const support = ["FAQs", "Track order", "Delivery areas", "Careers"];

  const socials = [
    { Icon: FaInstagram, color: "#E1306C" },
    { Icon: FaFacebook, color: "#1877F2" },
    { Icon: FaTwitter, color: "#1DA1F2" },
  ];

  return (
    <footer className="relative bg-[#1F1C18] text-[#C9C4BA] overflow-hidden">

      {/* glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D8531F]/20 blur-[120px] rounded-full" />

      {/* top line */}
      <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7C9473] to-[#D8531F]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-10">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#D8531F] flex items-center justify-center shadow-[0_0_25px_rgba(189,106,60,0.6)]">
                <Pizza size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Pizza<span className="text-[#D8531F]">Hub</span>
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-[#A8A39A]">
              Fresh handmade pizza delivered hot & fast with premium ingredients
              and authentic Italian taste.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#2A2622] flex items-center justify-center
                  hover:scale-110 transition-all duration-300 shadow-md"
                  style={{
                    boxShadow: `0 0 0px ${color}`,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 20px ${color}`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 0px transparent")
                  }
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-[#A8A39A]">
              {quickLinks.map((item) => (
                <li key={item}>
                  <a className="hover:text-[#D8531F] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-[#A8A39A]">
              {support.map((item) => (
                <li key={item}>
                  <a className="hover:text-[#7C9473] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-[#A8A39A] mb-4">
              Get deals & new pizza drops.
            </p>

            <div className="flex">
              <input
                placeholder="Enter email"
                className="w-full px-4 py-2 rounded-l-full bg-[#2A2622] text-white outline-none"
              />
              <button className="bg-[#D8531F] px-4 rounded-r-full hover:bg-[#A85A2F] transition">
                <ArrowRight size={18} />
              </button>
            </div>

            {/* CONTACT */}
            <div className="mt-6 space-y-3 text-sm text-[#A8A39A]">
              <p className="flex items-center gap-2">
                <MapPin size={14} /> New Delhi, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} /> support@pizzahub.com
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[#2A2622] mt-12 pt-6 flex flex-col sm:flex-row justify-between text-sm text-[#7A756D]">
          <p>© {year} PizzaHub. All rights reserved.</p>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <span className="hover:text-[#D8531F] cursor-pointer">Privacy</span>
            <span className="hover:text-[#D8531F] cursor-pointer">Terms</span>
            <Link
              to="/admin/login"
              className="hover:text-[#D8531F] transition"
            >
              Staff Login
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
