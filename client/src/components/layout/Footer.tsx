const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF6B6B]">
            PizzaHub
          </h2>
          <p className="text-gray-400 mt-3">
            Premium pizza delivered fresh & fast.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">

            <li className="hover:text-[#FF6B6B] cursor-pointer">
              Home
            </li>

            <li className="hover:text-[#FF6B6B] cursor-pointer">
              Menu
            </li>

            <li className="hover:text-[#FF6B6B] cursor-pointer">
              Contact
            </li>

          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4 text-gray-300">

            <span className="hover:text-[#FF6B6B] cursor-pointer">
              Facebook
            </span>

            <span className="hover:text-[#FF6B6B] cursor-pointer">
              Instagram
            </span>

            <span className="hover:text-[#FF6B6B] cursor-pointer">
              Twitter
            </span>

          </div>

        </div>

      </div>

      <div className="text-center text-gray-500 py-4 border-t border-gray-700">
        © 2026 PizzaHub. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;