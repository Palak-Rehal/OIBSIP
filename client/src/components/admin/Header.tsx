import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Header = () => {

  const { user } = useAuth();

  return (

    <header
      className="
        sticky
        top-0
        z-40
        bg-white/90
        backdrop-blur-md
        border-b
        border-gray-200
      "
    >

      <div className="h-20 px-8 flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-black text-[#2E2B27]">

            Dashboard

          </h1>

          <p className="text-gray-500 text-sm">

            Welcome back,
            <span className="font-semibold ml-1">
              {user?.name}
            </span>

          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="relative hidden lg:block">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              placeholder="Search..."
              className="
                w-72
                pl-11
                pr-4
                py-3
                rounded-xl
                border
                border-gray-200
                focus:outline-none
                focus:border-[#BD6A3C]
              "
            />

          </div>

          {/* Notification */}

          <button
            className="
              relative
              h-12
              w-12
              rounded-xl
              bg-[#F8F9FC]
              hover:bg-[#ececec]
              transition
            "
          >

            <Bell
              className="mx-auto mt-3"
              size={20}
            />

            <span
              className="
                absolute
                top-2
                right-2
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />

          </button>

          {/* Profile */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-[#F8F9FC]
              rounded-xl
              px-4
              py-2
            "
          >

            <div
              className="
                h-11
                w-11
                rounded-full
                bg-[#BD6A3C]
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-lg
              "
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <p className="font-semibold">

                {user?.name}

              </p>

              <p className="text-xs text-gray-500">

                Administrator

              </p>

            </div>

            <ChevronDown size={18} />

          </div>

        </div>

      </div>

    </header>

  );

};

export default Header;