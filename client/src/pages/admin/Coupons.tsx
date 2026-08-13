import { useEffect, useMemo, useState } from "react";

import {
  Search,
  TicketPercent,
  Plus,
  Trash2,
  X,
  CalendarDays,
  IndianRupee,
  Percent,
  CheckCircle2,
  Clock3,
  Tag,
} from "lucide-react";

import {
  getAllCoupons,
  createCoupon,
  deleteCoupon,
} from "../../api/adminApi";

interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minimumOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [creating, setCreating] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minimumOrder: 0,
    expiryDate: "",
  });

  // =====================================================
  // FETCH COUPONS
  // =====================================================

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const res = await getAllCoupons();

      setCoupons(res.data.coupons || []);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return coupons;

    return coupons.filter((coupon) =>
      coupon.code?.toLowerCase().includes(query)
    );
  }, [coupons, search]);

  // =====================================================
  // STATS
  // =====================================================

  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) =>
      coupon.isActive &&
      new Date(coupon.expiryDate) >= new Date()
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) =>
      new Date(coupon.expiryDate) < new Date()
  ).length;

  const inactiveCoupons = coupons.filter(
    (coupon) => !coupon.isActive
  ).length;

  // =====================================================
  // FORM RESET
  // =====================================================

  const resetForm = () => {
    setForm({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minimumOrder: 0,
      expiryDate: "",
    });
  };
  // =====================================================
  // CREATE COUPON
  // =====================================================

  const handleCreate = async () => {
    if (!form.code.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    if (form.discountValue <= 0) {
      alert("Please enter a valid discount value.");
      return;
    }

    if (!form.expiryDate) {
      alert("Please select an expiry date.");
      return;
    }

    try {
      setCreating(true);

      await createCoupon({
        ...form,
        code: form.code.trim().toUpperCase(),
      });

      setShowModal(false);

      resetForm();

      await fetchCoupons();
    } catch (error) {
      console.error("Failed to create coupon:", error);
    } finally {
      setCreating(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteCoupon(id);

      await fetchCoupons();
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full max-w-[1500px] mx-auto pb-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

            <span className="text-xs font-bold tracking-[2px] uppercase text-[#BD6A3C]">
              PizzaHub Admin
            </span>

          </div>

          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#24211F]">
            Coupons
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Create and manage discount offers.
          </p>

        </div>


        {/* ADD COUPON */}

        <button
          onClick={() => setShowModal(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            h-11
            rounded-xl
            bg-[#BD6A3C]
            px-5
            text-sm
            font-bold
            text-white
            shadow-sm
            transition
            hover:bg-[#A85A2F]
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <Plus size={17} />

          Add Coupon
        </button>

      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {/* TOTAL */}

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
                Total Coupons
              </p>

              <h2 className="text-2xl font-black text-[#24211F] mt-1">
                {totalCoupons}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-[#FBE8DC] flex items-center justify-center">

              <TicketPercent
                size={19}
                className="text-[#BD6A3C]"
              />

            </div>

          </div>

        </div>


        {/* ACTIVE */}

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
                Active
              </p>

              <h2 className="text-2xl font-black text-emerald-600 mt-1">
                {activeCoupons}
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


        {/* EXPIRED */}

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
                Expired
              </p>

              <h2 className="text-2xl font-black text-red-500 mt-1">
                {expiredCoupons}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">

              <Clock3
                size={19}
                className="text-red-500"
              />

            </div>

          </div>

        </div>


        {/* INACTIVE */}

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
                Inactive
              </p>

              <h2 className="text-2xl font-black text-gray-600 mt-1">
                {inactiveCoupons}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">

              <Tag
                size={19}
                className="text-gray-600"
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          COUPONS CARD
      ===================================================== */}

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

        {/* CARD HEADER */}

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

              <TicketPercent
                size={18}
                className="text-[#BD6A3C]"
              />

            </div>

            <div>

              <h2 className="text-lg font-black text-[#24211F]">
                Coupon List
              </h2>

              <p className="text-xs text-gray-500">
                {filteredCoupons.length} coupon
                {filteredCoupons.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>


          <div className="text-xs font-semibold text-gray-400">
            Showing {filteredCoupons.length} of{" "}
            {coupons.length}
          </div>

        </div>


        {/* SEARCH */}

        <div className="px-5 py-4 border-b border-[#EEE7E1]">

          <div className="relative w-full sm:w-[300px]">

            <Search
              size={16}
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
              placeholder="Search coupons..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-10
                rounded-xl
                border
                border-[#E8E1DB]
                bg-[#FCFAF8]
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-[#BD6A3C]
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            />

          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="p-5 space-y-3">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="
                  h-16
                  rounded-xl
                  bg-gray-100
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : filteredCoupons.length === 0 ? (

          /* =================================================
              EMPTY
          ================================================= */

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

              <TicketPercent
                size={25}
                className="text-[#BD6A3C]"
              />

            </div>

            <h3 className="font-bold text-[#2E2B27]">
              No coupons found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or create a new coupon.
            </p>

          </div>

        ) : (

          /* =================================================
              TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="bg-[#FBF9F7] border-b border-[#EEE7E1]">

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Coupon
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Discount
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Minimum Order
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Expiry
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

                {filteredCoupons.map((coupon) => {

                  const expired = isExpired(
                    coupon.expiryDate
                  );

                  const active =
                    coupon.isActive && !expired;

                  return (

                    <tr
                      key={coupon._id}
                      className="
                        border-b
                        border-[#F0EBE7]
                        last:border-b-0
                        hover:bg-[#FCFAF8]
                        transition-colors
                      "
                    >

                      {/* COUPON */}

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

                            <TicketPercent
                              size={16}
                              className="text-[#BD6A3C]"
                            />

                          </div>

                          <div>

                            <p className="text-sm font-black tracking-wide text-[#2E2B27]">
                              {coupon.code}
                            </p>

                            <p className="text-[10px] text-gray-400 mt-0.5">
                              Discount coupon
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* DISCOUNT */}

                      <td className="px-4 py-3.5">

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            border
                            border-[#E7C8B6]
                            bg-[#FBE8DC]
                            px-2.5
                            py-1
                            text-[10px]
                            font-black
                            text-[#A85A2F]
                          "
                        >
                          {coupon.discountType === "percentage" ? (
                            <Percent size={11} />
                          ) : (
                            <IndianRupee size={11} />
                          )}

                          {coupon.discountValue}

                          {coupon.discountType === "percentage"
                            ? "%"
                            : " OFF"}

                        </span>

                      </td>


                      {/* MINIMUM */}

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-1">

                          <IndianRupee
                            size={13}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-bold text-[#2E2B27]">
                            {coupon.minimumOrder}
                          </span>

                        </div>

                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Minimum order
                        </p>

                      </td>


                      {/* EXPIRY */}

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-1.5">

                          <CalendarDays
                            size={13}
                            className={
                              expired
                                ? "text-red-500"
                                : "text-[#BD6A3C]"
                            }
                          />

                          <span
                            className={`
                              text-xs
                              font-semibold
                              ${expired
                                ? "text-red-500"
                                : "text-gray-600"
                              }
                            `}
                          >
                            {formatDate(
                              coupon.expiryDate
                            )}
                          </span>

                        </div>

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
                            ${active
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : "border-red-200 bg-red-50 text-red-600"
                            }
                          `}
                        >

                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              ${active
                                ? "bg-emerald-500"
                                : "bg-red-500"
                              }
                            `}
                          />

                          {expired
                            ? "Expired"
                            : coupon.isActive
                              ? "Active"
                              : "Inactive"}

                        </span>

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-3.5 text-right">

                        <button
                          onClick={() =>
                            handleDelete(
                              coupon._id
                            )
                          }
                          disabled={
                            deletingId ===
                            coupon._id
                          }
                          title="Delete coupon"
                          className="
                            inline-flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-red-200
                            bg-red-50
                            text-red-500
                            transition
                            hover:bg-red-500
                            hover:text-white
                            disabled:opacity-50
                            disabled:cursor-wait
                          "
                        >

                          <Trash2 size={15} />

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


      {/* =====================================================
          CREATE COUPON MODAL
      ===================================================== */}

      {showModal && (

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
          onClick={() => {
            if (!creating) {
              setShowModal(false);
            }
          }}
        >

          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-white/40
              bg-white
              shadow-2xl
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
                border-b
                border-[#EEE7E1]
                bg-white/95
                px-6
                py-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    h-11
                    w-11
                    rounded-2xl
                    bg-[#FBE8DC]
                    flex
                    items-center
                    justify-center
                  "
                >

                  <TicketPercent
                    size={20}
                    className="text-[#BD6A3C]"
                  />

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#BD6A3C]">
                    Promotions
                  </p>

                  <h2 className="text-xl font-black text-[#24211F]">
                    Create Coupon
                  </h2>

                </div>

              </div>


              <button
                onClick={() => {
                  if (!creating) {
                    setShowModal(false);
                  }
                }}
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
                <X size={18} />
              </button>

            </div>


            {/* FORM */}

            <div className="p-6 space-y-4">

              {/* CODE */}

              <div>

                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Coupon Code
                </label>

                <input
                  type="text"
                  placeholder="e.g. PIZZA20"
                  value={form.code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value
                        .toUpperCase(),
                    })
                  }
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border
                    border-[#E5DDD6]
                    bg-[#FCFAF8]
                    px-3.5
                    text-sm
                    font-bold
                    tracking-wide
                    outline-none
                    transition
                    focus:border-[#BD6A3C]
                    focus:ring-4
                    focus:ring-[#BD6A3C]/10
                  "
                />

              </div>


              {/* DISCOUNT TYPE */}

              <div>

                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Discount Type
                </label>

                <select
                  value={form.discountType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      discountType:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border
                    border-[#E5DDD6]
                    bg-[#FCFAF8]
                    px-3.5
                    text-sm
                    font-semibold
                    text-[#2E2B27]
                    outline-none
                    cursor-pointer
                    focus:border-[#BD6A3C]
                    focus:ring-4
                    focus:ring-[#BD6A3C]/10
                  "
                >

                  <option value="Percentage">
                    Percentage (%)
                  </option>

                  <option value="Fixed">
                    Fixed Amount (₹)
                  </option>

                </select>

              </div>


              {/* VALUE + MINIMUM */}

              <div className="grid grid-cols-2 gap-3">

                <div>

                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Discount Value
                  </label>

                  <div className="relative">

                    <input
                      type="number"
                      min="0"
                      value={
                        form.discountValue
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          discountValue:
                            Number(
                              e.target.value
                            ),
                        })
                      }
                      className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-[#E5DDD6]
                        bg-[#FCFAF8]
                        px-3.5
                        pr-9
                        text-sm
                        font-bold
                        outline-none
                        focus:border-[#BD6A3C]
                        focus:ring-4
                        focus:ring-[#BD6A3C]/10
                      "
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      {form.discountType ===
                        "Percentage"
                        ? "%"
                        : "₹"}
                    </span>

                  </div>

                </div>


                <div>

                  <label className="block text-xs font-bold text-gray-500 mb-1.5">
                    Minimum Order
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={13}
                      className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                      "
                    />

                    <input
                      type="number"
                      min="0"
                      value={
                        form.minimumOrder
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          minimumOrder:
                            Number(
                              e.target.value
                            ),
                        })
                      }
                      className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-[#E5DDD6]
                        bg-[#FCFAF8]
                        pl-8
                        pr-3
                        text-sm
                        font-bold
                        outline-none
                        focus:border-[#BD6A3C]
                        focus:ring-4
                        focus:ring-[#BD6A3C]/10
                      "
                    />

                  </div>

                </div>

              </div>


              {/* EXPIRY */}

              <div>

                <label className="block text-xs font-bold text-gray-500 mb-1.5">
                  Expiry Date
                </label>

                <div className="relative">

                  <CalendarDays
                    size={15}
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />

                  <input
                    type="date"
                    value={
                      form.expiryDate
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        expiryDate:
                          e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-11
                      rounded-xl
                      border
                      border-[#E5DDD6]
                      bg-[#FCFAF8]
                      pl-10
                      pr-3
                      text-sm
                      font-semibold
                      outline-none
                      focus:border-[#BD6A3C]
                      focus:ring-4
                      focus:ring-[#BD6A3C]/10
                    "
                  />

                </div>

              </div>


              {/* CREATE */}

              <button
                onClick={handleCreate}
                disabled={creating}
                className="
                  mt-2
                  w-full
                  h-11
                  rounded-xl
                  bg-[#BD6A3C]
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#A85A2F]
                  disabled:opacity-50
                  disabled:cursor-wait
                "
              >

                {creating
                  ? "Creating..."
                  : "Create Coupon"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Coupons;