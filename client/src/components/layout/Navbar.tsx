import { useState, useEffect } from "react";
import { ShoppingCart, Search, LogIn, Menu, X } from "lucide-react";

// Uses the same brand fonts as the hero — add once in your root layout:
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@1,500;1,600&family=Manrope:wght@500;600;700;800&display=swap" rel="stylesheet" />

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cartCount = 2;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = ["Home", "Menu", "Offers", "Contact"];

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="relative w-full bg-[#FAF7F2] border-b border-[#E4DCCB]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 px-5 sm:px-8 py-4">

          {/* Logo */}
          <a href="#" className="flex items-baseline gap-1 shrink-0">
            <span
              className="text-[21px] sm:text-[24px] italic text-[#BD6A3C] leading-none"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Pizza
            </span>
            <span
              className="text-[21px] sm:text-[24px] italic text-[#2E2B27] leading-none"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
            >
              Hub
            </span>
          </a>

          {/* Links */}
          <ul
            className="hidden md:flex gap-8 text-[#4A463F] text-[13px] tracking-[0.1em] uppercase shrink-0"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
          >
            {links.map((link) => (
              <li key={link} className="relative group cursor-pointer py-1 hover:text-[#BD6A3C] transition-colors">
                {link}
                <span
                  className="
                    absolute left-1/2 -bottom-0.5 h-[1.5px] w-0
                    bg-[#7C9473]
                    transition-all duration-300 ease-out
                    group-hover:w-full group-hover:left-0
                  "
                />
              </li>
            ))}
          </ul>

          {/* Search - desktop only */}
          <div className="hidden lg:flex items-center flex-1 max-w-[220px] relative">
            <Search size={15} className="absolute left-4 text-[#A69D8C]" />
            <input
              type="text"
              placeholder="Search pizza…"
              className="
                w-full pl-10 pr-4 py-2.5 rounded-full
                bg-white border border-[#E4DCCB]
                text-[13px] text-[#2E2B27] placeholder:text-[#A69D8C]
                focus:outline-none focus:border-[#BD6A3C]
                transition-colors
              "
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              aria-label="Cart"
              className="
                relative w-9 h-9 sm:w-10 sm:h-10 rounded-full
                border border-[#E4DCCB] bg-white
                text-[#4A463F]
                hover:bg-[#BD6A3C] hover:border-[#BD6A3C] hover:text-white
                transition-colors duration-200
                flex items-center justify-center shrink-0
              "
            >
              <ShoppingCart size={17} strokeWidth={2} />
              {cartCount > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1
                    w-[18px] h-[18px] rounded-full
                    bg-[#7C9473] text-white
                    text-[10px] font-bold
                    flex items-center justify-center
                    border-2 border-[#FAF7F2]
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="
                hidden sm:flex items-center gap-2
                px-4 py-2.5 rounded-full
                border border-[#E4DCCB] bg-white
                text-[#2E2B27] text-[13px]
                hover:border-[#BD6A3C] hover:text-[#BD6A3C]
                transition-colors duration-200
              "
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
            >
              <LogIn size={15} strokeWidth={2} />
              Sign in
            </button>

            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="
                md:hidden w-9 h-9 rounded-full
                border border-[#E4DCCB] bg-white
                text-[#4A463F]
                flex items-center justify-center shrink-0
              "
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="w-full bg-[#FAF7F2] border-b border-[#E4DCCB] px-5 sm:px-8 py-5 md:hidden">
          <div className="relative mb-5">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69D8C]" />
            <input
              type="text"
              placeholder="Search pizza…"
              className="
                w-full pl-10 pr-4 py-2.5 rounded-full
                bg-white border border-[#E4DCCB]
                text-[13px] text-[#2E2B27] placeholder:text-[#A69D8C]
                focus:outline-none focus:border-[#BD6A3C]
              "
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
          </div>
          <ul
            className="flex flex-col gap-4 text-[#4A463F] text-sm uppercase tracking-[0.1em]"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
          >
            {links.map((link) => (
              <li key={link} onClick={() => setOpen(false)} className="cursor-pointer hover:text-[#BD6A3C] transition-colors py-1">
                {link}
              </li>
            ))}
            <li
              onClick={() => setOpen(false)}
              className="cursor-pointer hover:text-[#BD6A3C] transition-colors py-1 flex items-center gap-2 sm:hidden"
            >
              <LogIn size={16} strokeWidth={2} />
              Sign in
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
