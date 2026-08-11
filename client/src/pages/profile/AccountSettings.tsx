import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Lock,
  Moon,
  Shield,
  Trash2,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      className={`w-14 h-8 rounded-full transition-all duration-300 ${
        enabled ? "bg-[#C86B36]" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-white p-3 rounded-xl shadow hover:shadow-lg transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-4xl font-black text-[#2E2B27]">
              Account Settings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your account preferences and security.
            </p>
          </div>
        </div>

        <div className="space-y-6">

          {/* Account */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#ECE5DD] p-7">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">
                <User
                  size={28}
                  className="text-[#C86B36]"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    Account Information
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Update your personal details
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="text-[#C86B36] flex items-center gap-2 font-semibold"
              >
                Edit
                <ChevronRight size={18} />
              </button>

            </div>

          </div>

          {/* Password */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#ECE5DD] p-7">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">
                <Lock
                  size={28}
                  className="text-blue-600"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    Change Password
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <ChevronRight />
            </div>

          </div>

          {/* Notifications */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#ECE5DD] p-7">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <Bell
                  size={28}
                  className="text-orange-500"
                />

                <div>
                  <h2 className="font-bold text-xl">
                    Notifications
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Order updates & offers
                  </p>
                </div>

              </div>

              <Toggle
                enabled={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

            </div>

          </div>

          {/* Newsletter */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#ECE5DD] p-7">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <Shield
                  size={28}
                  className="text-green-600"
                />

                <div>
                  <h2 className="font-bold text-xl">
                    Email Newsletter
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Promotions & discounts
                  </p>
                </div>

              </div>

              <Toggle
                enabled={newsletter}
                onChange={() =>
                  setNewsletter(!newsletter)
                }
              />

            </div>

          </div>

          {/* Dark Mode */}

          <div className="bg-white rounded-3xl shadow-lg border border-[#ECE5DD] p-7">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <Moon
                  size={28}
                  className="text-purple-600"
                />

                <div>
                  <h2 className="font-bold text-xl">
                    Dark Mode
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Coming soon
                  </p>
                </div>

              </div>

              <Toggle
                enabled={darkMode}
                onChange={() =>
                  setDarkMode(!darkMode)
                }
              />

            </div>

          </div>

          {/* Danger Zone */}

          <div className="bg-white rounded-3xl shadow-lg border border-red-200 p-7">

            <h2 className="text-red-600 font-bold text-xl mb-6">
              Danger Zone
            </h2>

            <div className="flex gap-4">

              <button
                className="
                  flex-1
                  py-4
                  rounded-xl
                  border
                  border-red-500
                  text-red-500
                  font-bold
                  flex
                  justify-center
                  items-center
                  gap-3
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                <Trash2 size={18}/>
                Delete Account
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className="
                  flex-1
                  py-4
                  rounded-xl
                  bg-[#C86B36]
                  text-white
                  font-bold
                  flex
                  justify-center
                  items-center
                  gap-3
                  hover:bg-[#B55C2C]
                  transition
                "
              >
                <LogOut size={18}/>
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountSettings;