import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  LogIn,
  Menu,
  X,
  Pizza,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Heart,
  Package,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { getAllPizzas } from "../../api/pizzaApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { cart } = useCart();
  const cartCount = cart.length;
  const handleLogout = () => {
    logout();
    navigate("/login");
    setProfileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Offers", path: "/offers" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter") return;

    searchPizza();
  };
  useEffect(() => {

    const loadSuggestions = async () => {

      if (!search.trim()) {
        setSuggestions([]);
        return;
      }

      try {

        const res = await getAllPizzas(
          search,
          "",
          "latest",
          0,
          1000,
          false
        );

        setSuggestions(res.data.pizzas.slice(0, 5));

      } catch {

        setSuggestions([]);

      }

    };

    const timer = setTimeout(loadSuggestions, 300);

    return () => clearTimeout(timer);

  }, [search]);


  const searchPizza = () => {
    if (!search.trim()) return;

    navigate(
      `/menu?search=${encodeURIComponent(search.trim())}`
    );

    setOpen(false);
  };

  return (
    <header
      className="
fixed
top-0
left-0
w-full
z-50
backdrop-blur-2xl
bg-white/55
border-b
border-white/30
shadow-[0_8px_30px_rgba(0,0,0,.08)]
transition-all
duration-500
">
      <nav
        className="
w-full
bg-white/35
backdrop-blur-2xl
border-b
border-white/30
">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-8 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">

            <span className="w-10 h-10 rounded-full bg-[#2E2B27] flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:bg-[#BD6A3C]">

              <Pizza size={18} className="text-[#F2ECDD]" />

            </span>

            <span className="flex items-baseline gap-1">

              <span
                className="text-[23px] italic text-[#BD6A3C]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
              >
                Pizza
              </span>

              <span
                className="text-[23px] italic text-[#2E2B27]"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
              >
                Hub
              </span>

            </span>

          </Link>

          {/* Desktop Navigation */}

          <ul
            className="hidden md:flex items-center gap-8 uppercase tracking-[0.12em] text-[13px]"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
          >
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-1 transition-all duration-300 ${isActive
                      ? "text-[#BD6A3C]"
                      : "text-[#4A463F] hover:text-[#BD6A3C]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}

                      <span
                        className={`absolute left-0 -bottom-1 h-[2px] bg-[#7C9473] transition-all duration-300 ${isActive ? "w-full" : "w-0"
                          }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Desktop Search */}

          <div className="hidden lg:flex items-center flex-1 max-w-[330px] gap-2">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69D8C]"
              />

              <input
                type="text"
                placeholder="Search pizza..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-11 pr-4 py-3 rounded-full border border-[#DCD1B8] bg-white text-sm text-[#2E2B27] placeholder:text-[#A69D8C] focus:outline-none focus:border-[#BD6A3C] focus:ring-4 focus:ring-[#BD6A3C]/20 transition-all duration-300"
              />
              {
                suggestions.length > 0 && (

                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-50">

                    {suggestions.map((pizza) => (
                      <Link
                        key={pizza._id}
                        to={`/pizza/${pizza._id}`}
                        onClick={() => {

                          setSearch("");

                          setSuggestions([]);

                        }}
                        className="block px-4 py-3 hover:bg-[#FAF7F2]"
                      >

                        {pizza.name}

                      </Link>
                    ))}

                  </div>

                )
              }

            </div>

            <button
              onClick={searchPizza}
              className="px-5 py-3 rounded-full bg-[#BD6A3C] text-white font-semibold hover:bg-[#a95731] transition"
            >
              Search
            </button>

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3 shrink-0">

            {/* Cart */}

            <Link
              to="/cart"
              className="relative w-11 h-11 rounded-full border border-[#DCD1B8] bg-white flex items-center justify-center text-[#4A463F] hover:bg-[#BD6A3C] hover:text-white hover:border-[#BD6A3C] transition-all duration-300 hover:scale-105"
            >

              <ShoppingCart size={18} />

              {cartCount > 0 && (

                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7C9473] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#F2ECDD]">

                  {cartCount}

                </span>

              )}

            </Link>

            {/* Login / Profile */}

            {/* Profile Dropdown */}

            {user ? (

              <div className="relative hidden sm:block">

                <button
  onClick={() => setProfileOpen(!profileOpen)}
  className="
    group
    flex
    h-14
    items-center
    gap-3
    rounded-full
    border
    border-[#D8CCBE]
    bg-white/90
    px-4
    shadow-sm
    backdrop-blur-md
    transition-all
    duration-300
    hover:border-[#D8531F]
    hover:shadow-[0_8px_25px_rgba(216,83,31,0.12)]
  "
>
  {/* Avatar */}

  <span
    className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      bg-[#FCE4D6]
      text-[#D8531F]
      font-bold
    "
  >
    {(user.name || "P").charAt(0).toUpperCase()}
  </span>

  {/* Name */}

  <span className="font-bold text-[#22281F]">
    {user.name || "Profile"}
  </span>

  {/* Arrow */}

  <ChevronDown
    size={18}
    className={`
      text-[#555]
      transition-transform
      duration-300
      ${
        profileOpen
          ? "rotate-180 text-[#D8531F]"
          : ""
      }
    `}
  />

</button>

                {profileOpen && (
                  <div
                    className="
      absolute
      right-0
      top-[calc(100%+12px)]
      w-[290px]
      overflow-hidden
      rounded-[26px]
      border
      border-[#E8DED1]
      bg-white/95
      shadow-[0_20px_60px_rgba(50,35,20,0.18)]
      backdrop-blur-xl
      z-50
      animate-in
      fade-in
      slide-in-from-top-2
      duration-200
    "
                  >

                    {/* Account Header */}

                    <div className="px-5 pt-5 pb-4">

                      <div className="flex items-center gap-3">

                        {/* Avatar */}

                        <div
                          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#FCE4D6]
            text-[#D8531F]
            text-lg
            font-black
          "
                        >
                          {(user.name || "P").charAt(0).toUpperCase()}
                        </div>

                        {/* User info */}

                        <div className="min-w-0">

                          <p className="text-xs font-medium text-gray-400">
                            Welcome back
                          </p>

                          <p className="truncate text-base font-bold text-[#22281F]">
                            {user.name || "Profile"}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Divider */}

                    <div className="mx-4 border-t border-[#EEE5DA]" />


                    {/* Menu Items */}

                    <div className="p-3">

                      {/* PROFILE */}

                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="
          group
          flex
          items-center
          gap-4
          rounded-2xl
          px-4
          py-3
          text-[#22281F]
          transition-all
          duration-200
          hover:bg-[#FDF3EC]
          hover:text-[#D8531F]
        "
                      >

                        <span
                          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F7F5F0]
            transition
            group-hover:bg-[#FCE4D6]
          "
                        >
                          <User size={19} />
                        </span>

                        <div className="flex-1">

                          <p className="font-semibold">
                            Profile
                          </p>

                          <p className="text-xs text-gray-400">
                            Manage your account
                          </p>

                        </div>

                      </Link>


                      {/* ORDERS */}

                      <Link
                        to="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="
          group
          flex
          items-center
          gap-4
          rounded-2xl
          px-4
          py-3
          text-[#22281F]
          transition-all
          duration-200
          hover:bg-[#FDF3EC]
          hover:text-[#D8531F]
        "
                      >

                        <span
                          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F7F5F0]
            transition
            group-hover:bg-[#FCE4D6]
          "
                        >
                          <Package size={19} />
                        </span>

                        <div className="flex-1">

                          <p className="font-semibold">
                            My Orders
                          </p>

                          <p className="text-xs text-gray-400">
                            Track your orders
                          </p>

                        </div>

                      </Link>


                      {/* WISHLIST */}

                      <Link
                        to="/wishlist"
                        onClick={() => setProfileOpen(false)}
                        className="
          group
          flex
          items-center
          gap-4
          rounded-2xl
          px-4
          py-3
          text-[#22281F]
          transition-all
          duration-200
          hover:bg-[#FDF3EC]
          hover:text-[#D8531F]
        "
                      >

                        <span
                          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#F7F5F0]
            transition
            group-hover:bg-[#FCE4D6]
          "
                        >
                          <Heart
                            size={19}
                            className="
              transition-all
              duration-200
              group-hover:fill-[#D8531F]
              group-hover:text-[#D8531F]
            "
                          />
                        </span>

                        <div className="flex-1">

                          <p className="font-semibold">
                            Wishlist
                          </p>

                          <p className="text-xs text-gray-400">
                            Your saved pizzas
                          </p>

                        </div>

                      </Link>


                      {/* ADMIN */}

                      {user.role === "admin" && (

                        <Link
                          to="/admin/dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="
            group
            flex
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3
            text-[#22281F]
            transition-all
            duration-200
            hover:bg-[#FDF3EC]
            hover:text-[#D8531F]
          "
                        >

                          <span
                            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F7F5F0]
              transition
              group-hover:bg-[#FCE4D6]
            "
                          >
                            <LayoutDashboard size={19} />
                          </span>

                          <div className="flex-1">

                            <p className="font-semibold">
                              Admin Dashboard
                            </p>

                            <p className="text-xs text-gray-400">
                              Manage PizzaHub
                            </p>

                          </div>

                        </Link>

                      )}


                      {/* DIVIDER */}

                      <div className="my-2 border-t border-[#EEE5DA]" />


                      {/* LOGOUT */}

                      <button
                        onClick={handleLogout}
                        className="
          group
          flex
          w-full
          items-center
          gap-4
          rounded-2xl
          px-4
          py-3
          text-left
          text-red-500
          transition-all
          duration-200
          hover:bg-red-50
        "
                      >

                        <span
                          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-red-50
            transition
            group-hover:bg-red-100
          "
                        >
                          <LogOut size={19} />
                        </span>

                        <div>

                          <p className="font-semibold">
                            Logout
                          </p>

                          <p className="text-xs text-red-300">
                            Sign out of your account
                          </p>

                        </div>

                      </button>

                    </div>

                  </div>
                )}

              </div>

            ) : (


              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#DCD1B8]"
              >

                <LogIn size={17} />
                Sign In

              </Link>

            )}

            {/* Mobile Menu */}

            <button
              aria-label="Toggle Menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="md:hidden w-11 h-11 rounded-full bg-white border border-[#DCD1B8] flex items-center justify-center text-[#4A463F] hover:bg-[#BD6A3C] hover:text-white transition-all duration-300"
            >

              {open ? <X size={20} /> : <Menu size={20} />}

            </button>

          </div>

        </div>

      </nav>
      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="bg-[#F2ECDD] border-b border-[#DCD1B8] shadow-lg px-5 py-5">

          {/* Mobile Search */}
          <div className="relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69D8C]" />

            <input
              type="text"
              placeholder="Search pizza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#DCD1B8] text-[#2E2B27] placeholder:text-[#A69D8C] focus:outline-none focus:border-[#BD6A3C] focus:ring-4 focus:ring-[#BD6A3C]/20 transition"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="flex flex-col gap-2">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive
                    ? "bg-[#BD6A3C] text-white"
                    : "text-[#2E2B27] hover:bg-white hover:text-[#BD6A3C]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to={user ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#2E2B27] text-white py-3 font-semibold hover:bg-[#BD6A3C] transition-all duration-300"
            >
              {user ? (
                <>
                  <User size={18} />
                  My Profile
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#DCD1B8] bg-white py-3 font-semibold text-[#2E2B27] hover:border-[#BD6A3C] hover:text-[#BD6A3C] transition-all duration-300"
            >
              <ShoppingCart size={18} />
              Cart ({cartCount})
            </Link>

          </div>

        </div>
      </div>

    </header>
  );
};

export default Navbar;