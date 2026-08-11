import { useState } from "react";
import {
  Bell,
  ArrowLeft,
  CheckCircle,
  Clock,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Delivered",
      message: "Your Margherita Pizza has been delivered successfully.",
      time: "10 mins ago",
      icon: <CheckCircle className="text-green-500" size={26} />,
      unread: true,
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 40% OFF on your next pizza order.",
      time: "2 hours ago",
      icon: <Tag className="text-orange-500" size={26} />,
      unread: true,
    },
    {
      id: 3,
      title: "Order Preparing",
      message: "Your Farmhouse Pizza is now being prepared.",
      time: "Yesterday",
      icon: <Clock className="text-blue-500" size={26} />,
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-28 pb-12 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="bg-white p-3 rounded-xl shadow"
            >
              <ArrowLeft size={22}/>
            </button>

            <div>

              <h1 className="text-4xl font-black text-[#2E2B27]">
                Notifications
              </h1>

              <p className="text-gray-500 mt-2">
                Stay updated with your latest orders & offers.
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <button
              onClick={markAllRead}
              className="bg-[#C86B36] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#B45B2B]"
            >
              Mark All Read
            </button>

            <button
              onClick={clearAll}
              className="border border-red-500 text-red-500 px-5 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition"
            >
              Clear All
            </button>

          </div>

        </div>

        {notifications.length > 0 ? (

          <div className="space-y-5">

            {notifications.map((item) => (

              <div
                key={item.id}
                className={`bg-white rounded-3xl border shadow-md p-6 flex justify-between items-center hover:shadow-xl transition ${
                  item.unread
                    ? "border-[#C86B36]"
                    : "border-[#ECE5DD]"
                }`}
              >

                <div className="flex gap-5 items-center">

                  <div className="bg-[#FFF6EF] p-4 rounded-2xl">
                    {item.icon}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-[#2E2B27]">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {item.time}
                    </p>

                  </div>

                </div>

                {item.unread && (
                  <span className="w-3 h-3 rounded-full bg-[#C86B36]" />
                )}

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <Bell
              size={70}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-3xl font-black mt-6">
              No Notifications
            </h2>

            <p className="text-gray-500 mt-4">
              You're all caught up!
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Notifications;