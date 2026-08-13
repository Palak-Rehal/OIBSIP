import { useState } from "react";
import {
  Boxes,
  AlertTriangle,
  ArrowUpRight,
  X,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react";

interface StockItem {
  name: string;
  stock: number;
  threshold: number;
}

const initialStockItems: StockItem[] = [
  {
    name: "Cheese",
    stock: 5,
    threshold: 20,
  },
  {
    name: "Pepperoni",
    stock: 8,
    threshold: 15,
  },
  {
    name: "Olives",
    stock: 10,
    threshold: 25,
  },
  {
    name: "Mushrooms",
    stock: 6,
    threshold: 18,
  },
];

const LowStock = () => {
  const [items, setItems] = useState<StockItem[]>(
    initialStockItems
  );

  const [selectedItem, setSelectedItem] =
    useState<StockItem | null>(null);

  const [quantity, setQuantity] = useState(10);

  const openRestock = (item: StockItem) => {
    setSelectedItem(item);
    setQuantity(10);
  };

  const closeRestock = () => {
    setSelectedItem(null);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 5);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(5, prev - 5));
  };

  const handleRestock = () => {
    if (!selectedItem || quantity <= 0) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.name === selectedItem.name
          ? {
              ...item,
              stock: item.stock + quantity,
            }
          : item
      )
    );

    closeRestock();
  };

  const getPercentage = (stock: number, threshold: number) => {
    return Math.min((stock / threshold) * 100, 100);
  };

  const isCritical = (item: StockItem) => {
    return item.stock <= item.threshold * 0.5;
  };

  return (
    <>
      {/* =====================================================
          LOW STOCK CARD
      ===================================================== */}

      <div className="rounded-[22px] border border-[#E8E2DA] bg-white p-5 shadow-[0_8px_30px_rgba(46,43,39,0.05)]">

        {/* Header */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1E5] text-[#BD6A3C]">
              <Boxes size={19} />
            </div>

            <div>

              <h2 className="text-base font-black text-[#292622]">
                Low Stock
              </h2>

              <p className="text-[11px] text-[#958C82]">
                Items that need attention
              </p>

            </div>

          </div>

          <span className="rounded-full bg-[#FFF1E5] px-2.5 py-1 text-[10px] font-bold text-[#BD6A3C]">
            {items.length} items
          </span>

        </div>


        {/* =====================================================
            ITEMS
        ===================================================== */}

        <div className="space-y-3">

          {items.map((item) => {

            const critical = isCritical(item);

            const percentage = getPercentage(
              item.stock,
              item.threshold
            );

            return (
              <div
                key={item.name}
                className="rounded-[18px] border border-[#EEE8E1] bg-[#FCFAF7] p-4 transition duration-200 hover:border-[#E4D6CA] hover:shadow-sm"
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        critical
                          ? "bg-[#FDEAEA] text-[#D33F3F]"
                          : "bg-[#FFF1E5] text-[#BD6A3C]"
                      }`}
                    >
                      <Boxes size={18} />
                    </div>

                    <div>

                      <h3 className="text-sm font-black text-[#292622]">
                        {item.name}
                      </h3>

                      <p className="mt-0.5 text-[10px] text-[#958C82]">
                        Threshold: {item.threshold} units
                      </p>

                    </div>

                  </div>


                  <div className="text-right">

                    <p
                      className={`text-lg font-black ${
                        critical
                          ? "text-[#D33F3F]"
                          : "text-[#BD6A3C]"
                      }`}
                    >
                      {item.stock}
                    </p>

                    <p className="text-[10px] text-[#A29A91]">
                      available
                    </p>

                  </div>

                </div>


                {/* Progress */}

                <div className="mt-3">

                  <div className="h-2 overflow-hidden rounded-full bg-[#EAE5DF]">

                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        critical
                          ? "bg-[#D33F3F]"
                          : "bg-[#BD6A3C]"
                      }`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>


                {/* Bottom */}

                <div className="mt-3 flex items-center justify-between">

                  <div
                    className={`flex items-center gap-1.5 text-[10px] font-bold ${
                      critical
                        ? "text-[#D33F3F]"
                        : "text-[#BD6A3C]"
                    }`}
                  >

                    <AlertTriangle size={13} />

                    {critical ? "Critical stock" : "Low stock"}

                  </div>


                  <button
                    onClick={() => openRestock(item)}
                    className="group flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-[#5E554D] transition hover:bg-[#F1E8DF] hover:text-[#BD6A3C]"
                  >

                    Restock

                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* =====================================================
          RESTOCK MODAL
      ===================================================== */}

      {selectedItem && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#292622]/50 p-4 backdrop-blur-sm"
          onClick={closeRestock}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-[24px] border border-white/60 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.20)]"
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-[#EEE8E1] px-5 py-4">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E5] text-[#BD6A3C]">
                  <Boxes size={17} />
                </div>

                <div>

                  <h2 className="text-sm font-black text-[#292622]">
                    Restock {selectedItem.name}
                  </h2>

                  <p className="text-[10px] text-[#958C82]">
                    Update inventory quantity
                  </p>

                </div>

              </div>


              <button
                onClick={closeRestock}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#958C82] transition hover:bg-[#F6F2EE] hover:text-[#292622]"
              >
                <X size={17} />
              </button>

            </div>


            {/* Modal Body */}

            <div className="p-5">

              {/* Current stock */}

              <div className="mb-4 rounded-2xl bg-[#FAF7F2] p-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold text-[#81776D]">
                    Current stock
                  </span>

                  <span className="text-sm font-black text-[#292622]">
                    {selectedItem.stock} units
                  </span>

                </div>

                <div className="mt-2 flex items-center justify-between">

                  <span className="text-xs text-[#958C82]">
                    Threshold
                  </span>

                  <span className="text-xs font-bold text-[#BD6A3C]">
                    {selectedItem.threshold} units
                  </span>

                </div>

              </div>


              {/* Quantity */}

              <label className="mb-2 block text-xs font-bold text-[#514B44]">
                Quantity to add
              </label>


              <div className="flex items-center gap-2">

                <button
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5DED6] bg-[#FAF7F2] text-[#5E554D] transition hover:bg-[#F1E8DF]"
                >
                  <Minus size={16} />
                </button>


                <div className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#E5DED6] bg-white text-lg font-black text-[#292622]">
                  {quantity}
                </div>


                <button
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#BD6A3C] text-white transition hover:bg-[#A9572E]"
                >
                  <Plus size={16} />
                </button>

              </div>


              {/* Quick quantities */}

              <div className="mt-3 grid grid-cols-3 gap-2">

                {[5, 10, 25].map((amount) => (

                  <button
                    key={amount}
                    onClick={() => setQuantity(amount)}
                    className={`rounded-lg border py-2 text-[10px] font-bold transition ${
                      quantity === amount
                        ? "border-[#BD6A3C] bg-[#FFF1E5] text-[#BD6A3C]"
                        : "border-[#E8E2DA] text-[#81776D] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    +{amount}
                  </button>

                ))}

              </div>


              {/* New stock preview */}

              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#EAF7EE] px-4 py-3">

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={15}
                    className="text-[#26924D]"
                  />

                  <span className="text-[11px] font-semibold text-[#39734C]">
                    New stock
                  </span>

                </div>

                <span className="text-sm font-black text-[#26924D]">
                  {selectedItem.stock + quantity} units
                </span>

              </div>

            </div>


            {/* Footer */}

            <div className="flex gap-2 border-t border-[#EEE8E1] bg-[#FCFAF7] p-4">

              <button
                onClick={closeRestock}
                className="flex-1 rounded-xl border border-[#E2DBD3] bg-white py-2.5 text-xs font-bold text-[#625950] transition hover:bg-[#F7F3EF]"
              >
                Cancel
              </button>

              <button
                onClick={handleRestock}
                className="flex-1 rounded-xl bg-[#BD6A3C] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#A9572E]"
              >
                Restock Item
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default LowStock;