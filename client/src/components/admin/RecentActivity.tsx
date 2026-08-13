import {
  ShoppingBag,
  CreditCard,
  Package,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

interface Activity {
  title: string;
  description: string;
  time: string;
  type: "order" | "payment" | "inventory" | "user";
}

const activities: Activity[] = [
  {
    title: "New order received",
    description: "Order #ORD105 placed by customer",
    time: "2 min ago",
    type: "order",
  },
  {
    title: "Payment completed",
    description: "Razorpay payment verified successfully",
    time: "15 min ago",
    type: "payment",
  },
  {
    title: "Inventory updated",
    description: "Cheese stock quantity updated",
    time: "1 hr ago",
    type: "inventory",
  },
  {
    title: "New user registered",
    description: "A new customer joined PizzaHub",
    time: "3 hrs ago",
    type: "user",
  },
];

const activityConfig = {
  order: {
    icon: ShoppingBag,
    iconBox: "bg-[#F3E1D3] text-[#BD6A3C]",
  },

  payment: {
    icon: CreditCard,
    iconBox: "bg-[#E8F5EC] text-[#26924D]",
  },

  inventory: {
    icon: Package,
    iconBox: "bg-[#FFF3E6] text-[#C47732]",
  },

  user: {
    icon: UserPlus,
    iconBox: "bg-[#E9EFF8] text-[#4D72A8]",
  },
};

const RecentActivity = () => {
  return (
    <div className="h-full rounded-[22px] border border-[#E8E2DA] bg-white p-5 shadow-[0_8px_25px_rgba(46,43,39,0.05)]">

      {/* ================= HEADER ================= */}

      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-[17px] font-black tracking-tight text-[#292622]">
            Recent Activity
          </h2>

          <p className="mt-1 text-[11px] text-[#958C82]">
            Latest admin updates
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E1D3] text-[#BD6A3C]">
          <CheckCircle2 size={17} />
        </div>

      </div>


      {/* ================= ACTIVITY LIST ================= */}

      <div className="space-y-2">

        {activities.map((activity, index) => {

          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="
                group
                relative
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-transparent
                px-3
                py-3
                transition-all
                duration-200
                hover:border-[#EEE7DF]
                hover:bg-[#FCFAF7]
              "
            >

              {/* ICON */}

              <div
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${config.iconBox}
                  transition-transform
                  duration-200
                  group-hover:scale-105
                `}
              >
                <Icon size={16} />
              </div>


              {/* CONTENT */}

              <div className="min-w-0 flex-1">

                <div className="flex items-center justify-between gap-3">

                  <h3 className="truncate text-[12px] font-bold text-[#39342F]">
                    {activity.title}
                  </h3>

                  <span className="shrink-0 text-[9px] font-medium text-[#A29A91]">
                    {activity.time}
                  </span>

                </div>

                <p className="mt-0.5 truncate text-[10px] text-[#8F877E]">
                  {activity.description}
                </p>

              </div>

            </div>
          );
        })}

      </div>


      {/* ================= FOOTER ================= */}

      <div className="mt-4 border-t border-[#F0ECE7] pt-3">

        <button
          className="
            w-full
            rounded-xl
            py-2
            text-[10px]
            font-bold
            text-[#BD6A3C]
            transition
            hover:bg-[#FAF4EE]
          "
        >
          View all activity →
        </button>

      </div>

    </div>
  );
};

export default RecentActivity;