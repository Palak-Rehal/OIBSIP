import {
  TrendingUp,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  growth?: string;
  color?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  growth = "+12%",
  color = "bg-orange-500",
}: StatCardProps) => {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/20
      bg-white/10
      backdrop-blur-xl
      p-6
      shadow-lg
      hover:shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      "
    >

      {/* Background Glow */}
      <div
        className={`
        absolute
        -right-8
        -top-8
        h-28
        w-28
        rounded-full
        opacity-20
        blur-2xl
        ${color}
        `}
      />

      <div className="flex items-center justify-between">

        {/* Text */}
        <div>
          <p className="
          text-sm
          text-gray-600
          dark:text-gray-300
          ">
            {title}
          </p>

          <h2 className="
          mt-2
          text-3xl
          font-bold
          text-[#4b2e1f]
          dark:text-white
          ">
            {value}
          </h2>


          <div className="
          mt-3
          flex
          items-center
          gap-1
          text-sm
          text-green-600
          ">
            <TrendingUp size={15}/>
            <span>
              {growth}
            </span>

            <span className="
            text-gray-500
            dark:text-gray-400
            ">
              this month
            </span>
          </div>

        </div>


        {/* Icon */}
        <div
          className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          text-white
          shadow-md
          ${color}
          `}
        >
          <Icon size={28}/>
        </div>

      </div>

    </div>
  );
};


export default StatCard;