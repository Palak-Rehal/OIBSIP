import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingUp } from "lucide-react";

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
  color = "orange",
}: StatCardProps) => {
  const colorStyles = {
    orange: {
      icon: "bg-[#F3E1D3] text-[#BD6A3C]",
      glow: "bg-[#BD6A3C]",
      growth: "text-[#26924D]",
    },

    green: {
      icon: "bg-[#E5F4EA] text-[#26924D]",
      glow: "bg-[#26924D]",
      growth: "text-[#26924D]",
    },

    blue: {
      icon: "bg-[#E7EFFB] text-[#4676B9]",
      glow: "bg-[#4676B9]",
      growth: "text-[#4676B9]",
    },

    purple: {
      icon: "bg-[#EEE7F8] text-[#7853A8]",
      glow: "bg-[#7853A8]",
      growth: "text-[#7853A8]",
    },
  };

  const selectedColor =
    colorStyles[color as keyof typeof colorStyles] ||
    colorStyles.orange;

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[20px]
        border
        border-[#E8E2DA]
        bg-white
        px-4
        py-4
        shadow-[0_5px_20px_rgba(46,43,39,0.045)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_28px_rgba(46,43,39,0.08)]
      "
    >
      {/* Soft background glow */}

      <div
        className={`
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          opacity-[0.07]
          blur-2xl
          transition-all
          duration-300
          group-hover:scale-125
          ${selectedColor.glow}
        `}
      />

      {/* Top row */}

      <div className="relative flex items-start justify-between gap-3">

        {/* Content */}

        <div className="min-w-0">

          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#958C82]">
            {title}
          </p>

          <h2
            className="
              mt-1.5
              truncate
              text-[25px]
              font-black
              leading-none
              tracking-tight
              text-[#292622]
            "
          >
            {value}
          </h2>

        </div>

        {/* Icon */}

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${selectedColor.icon}
            transition-transform
            duration-300
            group-hover:scale-105
          `}
        >
          <Icon size={17} strokeWidth={2.2} />
        </div>

      </div>

      {/* Bottom */}

      <div className="relative mt-3 flex items-center justify-between">

        <div
          className={`
            flex
            items-center
            gap-1
            text-[10px]
            font-bold
            ${selectedColor.growth}
          `}
        >
          <TrendingUp size={12} strokeWidth={2.5} />

          <span>{growth}</span>

          <span className="ml-0.5 font-medium text-[#A29A91]">
            this month
          </span>
        </div>

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF7F2] text-[#A29A91] transition-colors group-hover:bg-[#F3E1D3] group-hover:text-[#BD6A3C]">
          <ArrowUpRight size={11} />
        </div>

      </div>
    </div>
  );
};

export default StatCard;