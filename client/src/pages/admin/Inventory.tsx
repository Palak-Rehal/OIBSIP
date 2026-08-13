import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Package,
  AlertTriangle,
  Edit3,
  X,
  CheckCircle2,
  Boxes,
  ChevronDown,
} from "lucide-react";

import {
  getInventory,
  updateInventory,
} from "../../api/inventoryApi";

interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
}

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [selected, setSelected] =
    useState<InventoryItem | null>(null);

  const [stock, setStock] = useState(0);

  const [threshold, setThreshold] = useState(5);

  const [saving, setSaving] = useState(false);

  // =====================================================
  // FETCH INVENTORY
  // =====================================================

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const res = await getInventory();

      setItems(res.data.inventory || []);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        items
          .map((item) => item.category)
          .filter(Boolean)
      )
    );

    return ["All", ...uniqueCategories];
  }, [items]);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, categoryFilter]);

  // =====================================================
  // STATS
  // =====================================================

  const totalItems = items.length;

  const lowStockItems = items.filter(
    (item) => item.stock <= item.threshold
  ).length;

  const availableItems = items.filter(
    (item) => item.stock > item.threshold
  ).length;

  const totalUnits = items.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEdit = (item: InventoryItem) => {
    setSelected(item);
    setStock(item.stock);
    setThreshold(item.threshold);
  };

  // =====================================================
  // SAVE UPDATE
  // =====================================================

  const saveUpdate = async () => {
    if (!selected) return;

    try {
      setSaving(true);

      await updateInventory(selected._id, {
        stock,
        threshold,
      });

      setSelected(null);

      await fetchInventory();
    } catch (error) {
      console.error("Failed to update inventory:", error);
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // STOCK STATUS
  // =====================================================

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock <= item.threshold) {
      return {
        label: "Low Stock",
        className:
          "border-red-200 bg-red-50 text-red-600",
      };
    }

    return {
      label: "Available",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-600",
    };
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full max-w-[1500px] mx-auto pb-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

            <span className="text-xs font-bold tracking-[2px] uppercase text-[#BD6A3C]">
              PizzaHub Admin
            </span>

          </div>

          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#24211F]">
            Inventory
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Track stock levels and manage inventory.
          </p>

        </div>


        {/* SEARCH + CATEGORY */}

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

          {/* Search */}

          <div className="relative w-full sm:w-[270px]">

            <Search
              size={17}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-11
                rounded-xl
                border
                border-[#E8E1DB]
                bg-white
                pl-10
                pr-4
                text-sm
                text-[#2E2B27]
                placeholder:text-gray-400
                shadow-sm
                outline-none
                transition
                focus:border-[#BD6A3C]
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            />

          </div>


          {/* Category */}

          <div className="relative w-full sm:w-[175px]">

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
                h-11
                rounded-xl
                border
                border-[#E8E1DB]
                bg-white
                px-4
                pr-9
                text-sm
                font-semibold
                text-[#2E2B27]
                shadow-sm
                outline-none
                cursor-pointer
                focus:border-[#BD6A3C]
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

          </div>

        </div>

      </div>


      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {/* TOTAL ITEMS */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Total Items
              </p>

              <h2 className="text-2xl font-black text-[#24211F] mt-1">
                {totalItems}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-[#FBE8DC] flex items-center justify-center">

              <Boxes
                size={19}
                className="text-[#BD6A3C]"
              />

            </div>

          </div>

        </div>


        {/* TOTAL UNITS */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Total Units
              </p>

              <h2 className="text-2xl font-black text-[#24211F] mt-1">
                {totalUnits}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">

              <Package
                size={19}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>


        {/* LOW STOCK */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Low Stock
              </p>

              <h2 className="text-2xl font-black text-red-600 mt-1">
                {lowStockItems}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">

              <AlertTriangle
                size={19}
                className="text-red-600"
              />

            </div>

          </div>

        </div>


        {/* AVAILABLE */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Available
              </p>

              <h2 className="text-2xl font-black text-emerald-600 mt-1">
                {availableItems}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">

              <CheckCircle2
                size={19}
                className="text-emerald-600"
              />

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          INVENTORY TABLE
      ================================================= */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E9E1DA]
          bg-white
          shadow-sm
        "
      >

        {/* TABLE HEADER */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            px-5
            py-4
            border-b
            border-[#EEE7E1]
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                h-9
                w-9
                rounded-xl
                bg-[#FBE8DC]
                flex
                items-center
                justify-center
              "
            >

              <Package
                size={18}
                className="text-[#BD6A3C]"
              />

            </div>

            <div>

              <h2 className="text-lg font-black text-[#24211F]">
                Stock Overview
              </h2>

              <p className="text-xs text-gray-500">
                {filteredItems.length} item
                {filteredItems.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>


          <div className="text-xs font-semibold text-gray-400">
            Showing {filteredItems.length} of{" "}
            {items.length}
          </div>

        </div>


        {/* LOADING */}

        {loading ? (

          <div className="p-5 space-y-2">

            {[1, 2, 3, 4, 5].map((item) => (

              <div
                key={item}
                className="
                  h-14
                  rounded-xl
                  bg-gray-100
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : filteredItems.length === 0 ? (

          /* EMPTY */

          <div className="py-16 text-center">

            <div
              className="
                mx-auto
                h-14
                w-14
                rounded-2xl
                bg-[#F8F3EF]
                flex
                items-center
                justify-center
                mb-3
              "
            >

              <Package
                size={25}
                className="text-[#BD6A3C]"
              />

            </div>

            <h3 className="font-bold text-[#2E2B27]">
              No inventory found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or category.
            </p>

          </div>

        ) : (

          /* TABLE */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              <thead>

                <tr className="bg-[#FBF9F7] border-b border-[#EEE7E1]">

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Item
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Stock
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Threshold
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredItems.map((item) => {

                  const stockStatus =
                    getStockStatus(item);

                  return (

                    <tr
                      key={item._id}
                      className="
                        border-b
                        border-[#F0EBE7]
                        last:border-b-0
                        hover:bg-[#FCFAF8]
                        transition-colors
                      "
                    >

                      {/* ITEM */}

                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-3">

                          <div
                            className="
                              h-9
                              w-9
                              shrink-0
                              rounded-xl
                              bg-[#FBE8DC]
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <Package
                              size={16}
                              className="text-[#BD6A3C]"
                            />

                          </div>

                          <div>

                            <p className="text-sm font-bold text-[#2E2B27]">
                              {item.name}
                            </p>

                            <p className="text-[10px] text-gray-400 mt-0.5">
                              ID: {item._id.slice(-6).toUpperCase()}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td className="px-4 py-3.5">

                        <span
                          className="
                            inline-flex
                            rounded-lg
                            bg-[#F8F3EF]
                            px-2.5
                            py-1
                            text-[11px]
                            font-bold
                            text-[#806A5D]
                          "
                        >
                          {item.category}
                        </span>

                      </td>


                      {/* STOCK */}

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-2">

                          <span
                            className={`
                              text-sm
                              font-black
                              ${
                                item.stock <=
                                item.threshold
                                  ? "text-red-600"
                                  : "text-[#2E2B27]"
                              }
                            `}
                          >
                            {item.stock}
                          </span>

                          <span className="text-[10px] text-gray-400">
                            units
                          </span>

                        </div>

                      </td>


                      {/* THRESHOLD */}

                      <td className="px-4 py-3.5">

                        <span className="text-sm font-semibold text-gray-600">
                          {item.threshold}
                        </span>

                        <span className="text-[10px] text-gray-400 ml-1">
                          min
                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-4 py-3.5">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            ${stockStatus.className}
                          `}
                        >

                          {item.stock <=
                          item.threshold ? (
                            <AlertTriangle
                              size={11}
                            />
                          ) : (
                            <CheckCircle2
                              size={11}
                            />
                          )}

                          {stockStatus.label}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-3.5 text-right">

                        <button
                          onClick={() =>
                            openEdit(item)
                          }
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-[#E5D8CE]
                            bg-white
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-[#BD6A3C]
                            shadow-sm
                            transition
                            hover:bg-[#BD6A3C]
                            hover:text-white
                            hover:border-[#BD6A3C]
                          "
                        >

                          <Edit3 size={14} />

                          Edit

                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          EDIT STOCK MODAL
      ================================================= */}

      {selected && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#1C1714]/50
            backdrop-blur-sm
            p-4
          "
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/50
              bg-white
              shadow-2xl
              overflow-hidden
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                border-b
                border-[#EEE7E1]
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    h-10
                    w-10
                    rounded-xl
                    bg-[#FBE8DC]
                    flex
                    items-center
                    justify-center
                  "
                >

                  <Package
                    size={18}
                    className="text-[#BD6A3C]"
                  />

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#BD6A3C]">
                    Inventory
                  </p>

                  <h2 className="text-lg font-black text-[#24211F]">
                    Update Stock
                  </h2>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelected(null)
                }
                className="
                  h-9
                  w-9
                  rounded-xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  transition
                  hover:bg-gray-200
                  hover:text-gray-800
                "
              >

                <X size={17} />

              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-6">

              {/* PRODUCT */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#EDE5DE]
                  bg-[#FCFAF8]
                  p-4
                  mb-5
                "
              >

                <p className="text-xs text-gray-400">
                  Product
                </p>

                <p className="text-sm font-black text-[#2E2B27] mt-1">
                  {selected.name}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  {selected.category}
                </p>

              </div>


              {/* INPUTS */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                    Current Stock
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(
                        Math.max(
                          0,
                          Number(e.target.value)
                        )
                      )
                    }
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-[#E5DDD6]
                      bg-white
                      px-3
                      text-sm
                      font-bold
                      text-[#2E2B27]
                      outline-none
                      transition
                      focus:border-[#BD6A3C]
                      focus:ring-4
                      focus:ring-[#BD6A3C]/10
                    "
                  />

                </div>


                <div>

                  <label className="block text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1.5">
                    Low Stock At
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={threshold}
                    onChange={(e) =>
                      setThreshold(
                        Math.max(
                          0,
                          Number(e.target.value)
                        )
                      )
                    }
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-[#E5DDD6]
                      bg-white
                      px-3
                      text-sm
                      font-bold
                      text-[#2E2B27]
                      outline-none
                      transition
                      focus:border-[#BD6A3C]
                      focus:ring-4
                      focus:ring-[#BD6A3C]/10
                    "
                  />

                </div>

              </div>


              {/* PREVIEW */}

              <div
                className={`
                  mt-4
                  rounded-xl
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  ${
                    stock <= threshold
                      ? "bg-red-50 text-red-600 border border-red-100"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }
                `}
              >

                {stock <= threshold
                  ? "⚠ This item will be marked as low stock."
                  : "✓ Stock level is healthy."}

              </div>


              {/* ACTIONS */}

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    setSelected(null)
                  }
                  disabled={saving}
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    border
                    border-[#E5DDD6]
                    bg-white
                    text-sm
                    font-bold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>


                <button
                  onClick={saveUpdate}
                  disabled={saving}
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    bg-[#BD6A3C]
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#A85A2F]
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Inventory;