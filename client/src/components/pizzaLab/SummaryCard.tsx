import { motion } from "framer-motion";
import {
  Pizza,
  Layers,
  CircleDot,
  Leaf,
  Flame,
} from "lucide-react";

interface SummaryCardProps {
  selectedSize: {
    name: string;
    price: number;
  };
  selectedCrust: {
    name: string;
    price: number;
  };
  selectedSauce: {
    name: string;
    price: number;
  };
  selectedCheese: {
    name: string;
    price: number;
  };
  selectedToppings: string[];
  totalPrice?: number;
}

const SummaryCard = ({
  selectedSize,
  selectedCrust,
  selectedSauce,
  selectedCheese,
  selectedToppings,
  totalPrice,
}: SummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* ==========================================
          TICKET BODY
      ========================================== */}

      <div className="bg-[#FBF3E4] rounded-t-[22px] pt-6 px-6 pb-8 border border-b-0 border-[#E7D9BE] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">

        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#9C8767] font-black">
            Kitchen Ticket
          </p>
          <Flame
            size={16}
            className="text-[#E5501C]"
          />
        </div>

        <h2 className="text-2xl font-black text-[#241A12] mb-5">
          Your Pizza
        </h2>

        {/* Perforation line */}
        <div
          className="h-0 border-t-2 border-dashed border-[#D8C6A3] mb-5"
        />

        <div className="space-y-3.5 text-sm">
          <TicketRow
            icon={<CircleDot size={15} />}
            label="Size"
            value={selectedSize.name}
          />

          <TicketRow
            icon={<Layers size={15} />}
            label="Base"
            value={selectedCrust.name}
          />

          <TicketRow
            icon={<Flame size={15} />}
            label="Sauce"
            value={selectedSauce.name}
          />

          <TicketRow
            icon={<Pizza size={15} />}
            label="Cheese"
            value={selectedCheese.name}
          />

          {/* Toppings */}
          <div className="flex gap-3 items-start">
            <Leaf
              size={15}
              className="text-[#5B7F45] mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-[#9C8767] font-semibold uppercase text-[11px] tracking-wide">
                Toppings
              </p>

              {selectedToppings.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedToppings.map(
                    (item, index) => (
                      <span
                        key={index}
                        className="bg-[#F3E8D4] border border-[#E7D9BE] text-[#241A12] px-2 py-0.5 rounded-md text-xs font-bold"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-[#B9A88C] text-xs mt-1">
                  None added
                </p>
              )}
            </div>
          </div>
        </div>

        {totalPrice !== undefined && (
          <>
            <div className="h-0 border-t-2 border-dashed border-[#D8C6A3] my-5" />

            <div className="flex items-end justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-black">
                Total
              </span>

              <span className="text-3xl font-black text-[#B8431A]">
                ₹{totalPrice}
              </span>
            </div>
          </>
        )}
      </div>

      {/* ==========================================
          TORN TICKET EDGE
      ========================================== */}

      <div
        className="h-4 bg-[#FBF3E4] rounded-b-[22px]"
        style={{
          maskImage:
            "repeating-linear-gradient(-45deg, transparent 0 6px, black 6px 12px)",
          WebkitMaskImage:
            "repeating-linear-gradient(-45deg, transparent 0 6px, black 6px 12px)",
        }}
      />
    </motion.div>
  );
};

const TicketRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    <div className="text-[#E5501C] shrink-0">
      {icon}
    </div>

    <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
      <p className="text-[#9C8767] font-semibold uppercase text-[11px] tracking-wide">
        {label}
      </p>

      <p className="font-bold text-[#241A12] text-right truncate">
        {value}
      </p>
    </div>
  </div>
);

export default SummaryCard;