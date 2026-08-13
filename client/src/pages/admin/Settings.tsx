import { useState } from "react";
import {
  Store,
  Bell,
  ShieldCheck,
  Save,
  Check,
} from "lucide-react";

const Settings = () => {
  const [storeName, setStoreName] = useState("PizzaHub");
  const [email, setEmail] = useState("admin@pizzahub.com");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-8">

      {/* Header */}
      <div className="mb-6">

        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

          <span className="text-[10px] font-black uppercase tracking-[2px] text-[#BD6A3C]">
            PizzaHub Admin
          </span>
        </div>

        <h1 className="text-3xl font-black text-[#24211F]">
          Settings
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your store and admin preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-5">

        {/* Sidebar */}
        <div className="rounded-2xl border border-[#E9E1DA] bg-white p-2 shadow-sm h-fit">

          <div className="flex items-center gap-3 rounded-xl bg-[#FBE8DC] px-3 py-2.5 text-[#BD6A3C]">
            <Store size={17} />

            <span className="text-xs font-bold">
              Store
            </span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500">
            <Bell size={17} />

            <span className="text-xs font-semibold">
              Notifications
            </span>
          </div>

          <div className="flex items-center gap-3 px-3 py-2.5 text-gray-500">
            <ShieldCheck size={17} />

            <span className="text-xs font-semibold">
              Security
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">

          {/* Store */}
          <div className="rounded-2xl border border-[#E9E1DA] bg-white shadow-sm overflow-hidden">

            <div className="px-5 py-4 border-b border-[#EEE7E1] flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#FBE8DC] flex items-center justify-center">
                <Store size={17} className="text-[#BD6A3C]" />
              </div>

              <div>
                <h2 className="text-sm font-black text-[#24211F]">
                  Store Information
                </h2>

                <p className="text-[11px] text-gray-400">
                  Basic PizzaHub information
                </p>
              </div>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-4">

              <div>
                <label className="text-[11px] font-bold text-gray-500">
                  Store Name
                </label>

                <input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="
                    mt-1.5 w-full h-10
                    rounded-xl border border-[#E5DED8]
                    px-3 text-sm
                    outline-none
                    focus:border-[#BD6A3C]
                    focus:ring-4
                    focus:ring-[#BD6A3C]/10
                  "
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500">
                  Admin Email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    mt-1.5 w-full h-10
                    rounded-xl border border-[#E5DED8]
                    px-3 text-sm
                    outline-none
                    focus:border-[#BD6A3C]
                    focus:ring-4
                    focus:ring-[#BD6A3C]/10
                  "
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500">
                  Contact Number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="
                    mt-1.5 w-full h-10
                    rounded-xl border border-[#E5DED8]
                    px-3 text-sm
                    outline-none
                    focus:border-[#BD6A3C]
                    focus:ring-4
                    focus:ring-[#BD6A3C]/10
                  "
                />
              </div>

            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl border border-[#E9E1DA] bg-white shadow-sm overflow-hidden">

            <div className="px-5 py-4 border-b border-[#EEE7E1] flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Bell size={17} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-sm font-black">
                  Notifications
                </h2>

                <p className="text-[11px] text-gray-400">
                  Control admin alerts
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3">

              <label className="flex items-center justify-between rounded-xl bg-[#FAF8F6] px-4 py-3 cursor-pointer">

                <div>
                  <p className="text-sm font-bold">
                    Admin Notifications
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Receive important store notifications
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) =>
                    setNotifications(e.target.checked)
                  }
                  className="h-4 w-4 accent-[#BD6A3C]"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl bg-[#FAF8F6] px-4 py-3 cursor-pointer">

                <div>
                  <p className="text-sm font-bold">
                    New Order Alerts
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Get notified when a new order arrives
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={orderAlerts}
                  onChange={(e) =>
                    setOrderAlerts(e.target.checked)
                  }
                  className="h-4 w-4 accent-[#BD6A3C]"
                />
              </label>

            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">

            <button
              onClick={handleSave}
              className="
                inline-flex items-center gap-2
                rounded-xl
                bg-[#BD6A3C]
                px-5 py-2.5
                text-sm font-bold text-white
                shadow-sm
                hover:bg-[#A85A2F]
                transition
              "
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;