import { useEffect, useRef, useState } from "react";

import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  ShieldCheck,
  CheckCheck,
  ShoppingBag,
  Package,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [search, setSearch] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  /* ============================================================
     CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  ============================================================ */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* ============================================================
     LOGOUT
  ============================================================ */

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/login");
  };

  /* ============================================================
     SEARCH
  ============================================================ */

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    console.log("Admin search:", query);

    // You can connect this later to global order/user/pizza search.
  };

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-[68px]
        border-b
        border-[#E8E2DA]
        bg-[#FFFEFC]/95
        backdrop-blur-xl
      "
    >
      <div
        className="
          h-full
          px-4
          sm:px-6
          lg:px-7
          flex
          items-center
          justify-between
          gap-4
        "
      >

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#BD6A3C]
                shadow-[0_0_0_4px_rgba(189,106,60,0.10)]
              "
            />

            <span
              className="
                hidden
                sm:block
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#A0988E]
              "
            >
              PizzaHub Admin
            </span>

          </div>

          <h1
            className="
              mt-0.5
              text-lg
              sm:text-xl
              font-black
              tracking-tight
              text-[#292622]
            "
          >
            Dashboard
          </h1>

        </div>


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* =================================================
              SEARCH
          ================================================= */}

          <form
            onSubmit={handleSearch}
            className="
              relative
              hidden
              md:block
            "
          >

            <Search
              size={16}
              strokeWidth={2}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-[#A59C91]
                pointer-events-none
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="
                w-48
                lg:w-60
                rounded-xl
                border
                border-[#E7E0D8]
                bg-[#FAF8F5]
                py-2.5
                pl-10
                pr-4
                text-xs
                font-medium
                text-[#302C28]
                placeholder:text-[#AAA198]
                outline-none
                transition-all
                duration-200
                focus:border-[#BD6A3C]
                focus:bg-white
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            />

          </form>


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => {
                setNotificationOpen(
                  !notificationOpen
                );
                setProfileOpen(false);
              }}
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[#E8E1D9]
                bg-white
                text-[#686158]
                shadow-sm
                transition-all
                duration-200
                hover:border-[#BD6A3C]/30
                hover:bg-[#FAF4EF]
                hover:text-[#BD6A3C]
              "
              aria-label="Notifications"
            >

              <Bell
                size={18}
                strokeWidth={2}
              />

              {/* Notification Dot */}

              <span
                className="
                  absolute
                  right-[8px]
                  top-[7px]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#D94A4A]
                  ring-2
                  ring-white
                "
              />

            </button>


            {/* Notification Dropdown */}

            {notificationOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-[48px]
                  w-[310px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E8E1D9]
                  bg-white
                  shadow-[0_18px_50px_rgba(46,43,39,0.14)]
                  animate-in
                  fade-in
                  slide-in-from-top-2
                  duration-200
                "
              >

                {/* Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#F0EBE5]
                    px-4
                    py-3
                  "
                >

                  <div>

                    <h3
                      className="
                        text-sm
                        font-black
                        text-[#292622]
                      "
                    >
                      Notifications
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-[#9A9187]
                      "
                    >
                      Recent restaurant activity
                    </p>

                  </div>

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-1
                      text-[10px]
                      font-bold
                      text-[#BD6A3C]
                      hover:text-[#914C29]
                    "
                  >
                    <CheckCheck size={13} />
                    Mark all
                  </button>

                </div>


                {/* Notification Items */}

                <div className="divide-y divide-[#F3EEE8]">

                  <NotificationItem
                    icon={<ShoppingBag size={15} />}
                    title="New order received"
                    description="A customer placed a new order."
                    color="orange"
                  />

                  <NotificationItem
                    icon={<Package size={15} />}
                    title="Inventory update"
                    description="Check your low-stock items."
                    color="purple"
                  />

                </div>


                {/* Footer */}

                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate("/admin/orders");
                  }}
                  className="
                    w-full
                    border-t
                    border-[#F0EBE5]
                    px-4
                    py-3
                    text-center
                    text-[11px]
                    font-bold
                    text-[#BD6A3C]
                    transition
                    hover:bg-[#FAF7F2]
                  "
                >
                  View all orders
                </button>

              </div>

            )}

          </div>


          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#E8E1D9]
                bg-white
                px-2
                py-1.5
                shadow-sm
                transition-all
                duration-200
                hover:border-[#BD6A3C]/30
                hover:bg-[#FAF7F2]
              "
            >

              {/* Avatar */}

              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#BD6A3C]
                  text-xs
                  font-black
                  text-white
                  shadow-sm
                "
              >
                {firstLetter}
              </div>


              {/* User Info */}

              <div
                className="
                  hidden
                  sm:block
                  max-w-[120px]
                  text-left
                "
              >

                <p
                  className="
                    truncate
                    text-[11px]
                    font-bold
                    text-[#302C28]
                  "
                >
                  {user?.name || "Admin"}
                </p>

                <p
                  className="
                    truncate
                    text-[9px]
                    text-[#9A9187]
                  "
                >
                  Administrator
                </p>

              </div>


              <ChevronDown
                size={14}
                className={`
                  hidden
                  sm:block
                  text-[#8F877D]
                  transition-transform
                  duration-200
                  ${profileOpen ? "rotate-180" : ""}
                `}
              />

            </button>


            {/* Profile Dropdown */}

            {profileOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-[48px]
                  w-[220px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E8E1D9]
                  bg-white
                  shadow-[0_18px_50px_rgba(46,43,39,0.14)]
                  animate-in
                  fade-in
                  slide-in-from-top-2
                  duration-200
                "
              >

                {/* Profile Header */}

                <div
                  className="
                    border-b
                    border-[#F0EBE5]
                    bg-[#FAF7F2]
                    px-4
                    py-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#BD6A3C]
                        text-sm
                        font-black
                        text-white
                      "
                    >
                      {firstLetter}
                    </div>

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-black
                          text-[#292622]
                        "
                      >
                        {user?.name || "Admin"}
                      </p>

                      <p
                        className="
                          truncate
                          text-[10px]
                          text-[#968D83]
                        "
                      >
                        {user?.email || "Administrator"}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Menu */}

                <div className="p-2">

                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      font-semibold
                      text-[#5E574F]
                      transition
                      hover:bg-[#FAF7F2]
                      hover:text-[#BD6A3C]
                    "
                  >

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#F3E1D3]
                        text-[#BD6A3C]
                      "
                    >
                      <Settings size={15} />
                    </span>

                    <span>
                      Account Settings
                    </span>

                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings/security");
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      font-semibold
                      text-[#5E574F]
                      transition
                      hover:bg-[#FAF7F2]
                      hover:text-[#BD6A3C]
                    "
                  >

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#F0ECF8]
                        text-[#7853A8]
                      "
                    >
                      <ShieldCheck size={15} />
                    </span>

                    <span>
                      Security
                    </span>

                  </button>

                </div>


                {/* Logout */}

                <div
                  className="
                    border-t
                    border-[#F0EBE5]
                    p-2
                  "
                >

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-xs
                      font-bold
                      text-red-500
                      transition
                      hover:bg-red-50
                    "
                  >

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                      "
                    >
                      <LogOut size={15} />
                    </span>

                    Logout

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
};


/* ============================================================
   NOTIFICATION ITEM
============================================================ */

const NotificationItem = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "orange" | "purple";
}) => {

  const iconStyle =
    color === "orange"
      ? "bg-[#F3E1D3] text-[#BD6A3C]"
      : "bg-[#F0ECF8] text-[#7853A8]";

  return (
    <div
      className="
        flex
        gap-3
        px-4
        py-3
        transition
        hover:bg-[#FCFAF7]
      "
    >

      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          ${iconStyle}
        `}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p
          className="
            text-[11px]
            font-bold
            text-[#302C28]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5
            text-[10px]
            leading-4
            text-[#948B81]
          "
        >
          {description}
        </p>

      </div>

    </div>
  );
};

export default Header;