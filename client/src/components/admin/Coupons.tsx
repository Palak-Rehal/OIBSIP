import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  TicketPercent,
  Trash2,
  Pencil,
  Power,
  X,
  CalendarDays,
  Percent,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from "../../api/couponApi";

interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minimumOrder: number;
  maxDiscount: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const initialForm = {
  code: "",
  discountType: "percentage" as "percentage" | "flat",
  discountValue: 0,
  minimumOrder: 0,
  maxDiscount: 0,
  expiryDate: "",
  usageLimit: 100,
};

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingCoupon, setEditingCoupon] =
    useState<Coupon | null>(null);

  const [form, setForm] = useState(initialForm);

  /* =========================================================
     FETCH COUPONS
  ========================================================= */

  const fetchCoupons = async () => {
    try {
      setLoading(true);

      const res = await getCoupons();

      setCoupons(res.data.coupons || []);
    } catch (error) {
      console.error("Coupon fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredCoupons = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return coupons;

    return coupons.filter((coupon) =>
      coupon.code.toLowerCase().includes(value)
    );
  }, [coupons, search]);

  /* =========================================================
     MODAL
  ========================================================= */

  const openCreateModal = () => {
    setEditingCoupon(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);

    setForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minimumOrder: coupon.minimumOrder,
      maxDiscount: coupon.maxDiscount,
      expiryDate: coupon.expiryDate.slice(0, 10),
      usageLimit: coupon.usageLimit,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCoupon(null);
    setForm(initialForm);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    try {
      if (!form.code.trim()) {
        alert("Coupon code is required");
        return;
      }

      if (form.discountValue <= 0) {
        alert("Discount value must be greater than 0");
        return;
      }

      if (
        form.discountType === "percentage" &&
        form.discountValue > 100
      ) {
        alert("Percentage discount cannot be greater than 100%");
        return;
      }

      if (!form.expiryDate) {
        alert("Please select an expiry date");
        return;
      }

      if (form.usageLimit <= 0) {
        alert("Usage limit must be greater than 0");
        return;
      }

      if (editingCoupon) {
        await updateCoupon(editingCoupon._id, form);
      } else {
        await createCoupon(form);
      }

      closeModal();

      await fetchCoupons();
    } catch (error) {
      console.error("Coupon save error:", error);
      alert("Something went wrong.");
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (!confirmed) return;

    try {
      await deleteCoupon(id);
      await fetchCoupons();
    } catch (error) {
      console.error("Delete coupon error:", error);
    }
  };

  /* =========================================================
     TOGGLE
  ========================================================= */

  const handleToggle = async (id: string) => {
    try {
      await toggleCouponStatus(id);
      await fetchCoupons();
    } catch (error) {
      console.error("Toggle coupon error:", error);
    }
  };

  /* =========================================================
     STATS
  ========================================================= */

  const activeCoupons = coupons.filter(
    (coupon) => coupon.isActive
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) =>
      new Date(coupon.expiryDate).getTime() <
      new Date().getTime()
  ).length;

  const totalUsage = coupons.reduce(
    (total, coupon) => total + coupon.usedCount,
    0
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="w-full">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9185]">
              Marketing
            </span>

          </div>

          <h1 className="mt-1.5 text-2xl font-black tracking-tight text-[#292622] sm:text-3xl">
            Coupons
          </h1>

          <p className="mt-1 text-xs text-[#81796E]">
            Create and manage promotional discounts.
          </p>

        </div>

        <button
          onClick={openCreateModal}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#BD6A3C]
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            shadow-[0_6px_18px_rgba(189,106,60,0.22)]
            transition
            hover:bg-[#A85A2F]
            hover:-translate-y-0.5
          "
        >
          <Plus size={17} />
          Add Coupon
        </button>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-5 grid grid-cols-2 gap-3 xl:grid-cols-4">

        <CompactStat
          label="Total Coupons"
          value={coupons.length}
          icon={<TicketPercent size={17} />}
          iconClass="bg-[#F3E1D3] text-[#BD6A3C]"
        />

        <CompactStat
          label="Active"
          value={activeCoupons}
          icon={<Power size={17} />}
          iconClass="bg-[#E7F5EB] text-[#26924D]"
        />

        <CompactStat
          label="Expired"
          value={expiredCoupons}
          icon={<CalendarDays size={17} />}
          iconClass="bg-[#FDEAEA] text-[#C73A3A]"
        />

        <CompactStat
          label="Total Usage"
          value={totalUsage}
          icon={<Users size={17} />}
          iconClass="bg-[#E7EFFB] text-[#4676B9]"
        />

      </div>


      {/* =====================================================
          SEARCH + SUMMARY
      ===================================================== */}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:max-w-sm">

          <Search
            size={16}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#9A9185]
            "
          />

          <input
            type="text"
            placeholder="Search coupon code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-[#E6E0D8]
              bg-white
              py-2.5
              pl-10
              pr-4
              text-sm
              text-[#292622]
              outline-none
              transition
              placeholder:text-[#AAA299]
              focus:border-[#BD6A3C]
              focus:ring-2
              focus:ring-[#BD6A3C]/10
            "
          />

        </div>

        <p className="text-xs font-semibold text-[#938A80]">
          Showing {filteredCoupons.length} of {coupons.length} coupons
        </p>

      </div>


      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="
        overflow-hidden
        rounded-[22px]
        border
        border-[#E8E2DA]
        bg-white
        shadow-[0_8px_30px_rgba(46,43,39,0.045)]
      ">

        {/* Table Header */}

        <div className="
          flex
          items-center
          justify-between
          border-b
          border-[#EFEAE4]
          px-4
          py-4
          sm:px-5
        ">

          <div className="flex items-center gap-2.5">

            <div className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#F3E1D3]
              text-[#BD6A3C]
            ">
              <TicketPercent size={16} />
            </div>

            <div>

              <h2 className="text-sm font-black text-[#292622]">
                Coupon List
              </h2>

              <p className="text-[10px] text-[#9A9185]">
                Manage promotional offers
              </p>

            </div>

          </div>

          <span className="
            rounded-full
            bg-[#FAF7F2]
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-[#81796E]
          ">
            {filteredCoupons.length}
          </span>

        </div>


        {/* Loading */}

        {loading ? (

          <div className="flex min-h-[280px] items-center justify-center">

            <div className="text-center">

              <div className="
                mx-auto
                h-7
                w-7
                animate-spin
                rounded-full
                border-2
                border-[#E8E2DA]
                border-t-[#BD6A3C]
              " />

              <p className="mt-3 text-xs font-semibold text-[#938A80]">
                Loading coupons...
              </p>

            </div>

          </div>

        ) : filteredCoupons.length === 0 ? (

          <div className="flex min-h-[280px] items-center justify-center">

            <div className="text-center">

              <div className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#FAF7F2]
                text-[#BD6A3C]
              ">
                <TicketPercent size={22} />
              </div>

              <h3 className="mt-3 text-sm font-black text-[#292622]">
                No coupons found
              </h3>

              <p className="mt-1 text-xs text-[#938A80]">
                Create your first coupon to get started.
              </p>

            </div>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="
                  border-b
                  border-[#EFEAE4]
                  bg-[#FCFAF7]
                  text-left
                ">

                  <TableHead>Coupon</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Minimum</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>

                </tr>

              </thead>

              <tbody>

                {filteredCoupons.map((coupon) => {

                  const isExpired =
                    new Date(coupon.expiryDate).getTime() <
                    new Date().getTime();

                  return (

                    <tr
                      key={coupon._id}
                      className="
                        border-b
                        border-[#F1EDE8]
                        last:border-none
                        transition
                        hover:bg-[#FCFAF7]
                      "
                    >

                      {/* Coupon */}

                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-3">

                          <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#F3E1D3]
                            text-[#BD6A3C]
                          ">
                            <TicketPercent size={16} />
                          </div>

                          <div>

                            <p className="
                              text-sm
                              font-black
                              tracking-wide
                              text-[#302C28]
                            ">
                              {coupon.code}
                            </p>

                            <p className="text-[10px] text-[#A29A91]">
                              Promotional code
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* Discount */}

                      <td className="px-5 py-3.5">

                        <span className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          bg-[#F7F2ED]
                          px-2.5
                          py-1.5
                          text-xs
                          font-bold
                          text-[#BD6A3C]
                        ">

                          {coupon.discountType === "percentage" ? (
                            <Percent size={12} />
                          ) : (
                            <span className="font-black">
                              ₹
                            </span>
                          )}

                          {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `₹${coupon.discountValue}`}

                        </span>

                      </td>


                      {/* Minimum */}

                      <td className="px-5 py-3.5">

                        <p className="text-xs font-bold text-[#514B44]">
                          ₹{coupon.minimumOrder}
                        </p>

                      </td>


                      {/* Expiry */}

                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-2">

                          <CalendarDays
                            size={14}
                            className={
                              isExpired
                                ? "text-red-400"
                                : "text-[#9A9185]"
                            }
                          />

                          <span
                            className={`
                              text-xs font-semibold
                              ${
                                isExpired
                                  ? "text-red-500"
                                  : "text-[#514B44]"
                              }
                            `}
                          >
                            {new Date(
                              coupon.expiryDate
                            ).toLocaleDateString()}
                          </span>

                        </div>

                      </td>


                      {/* Usage */}

                      <td className="px-5 py-3.5">

                        <div className="w-24">

                          <div className="mb-1 flex justify-between">

                            <span className="text-[10px] font-bold text-[#514B44]">
                              {coupon.usedCount}
                            </span>

                            <span className="text-[10px] text-[#9A9185]">
                              {coupon.usageLimit}
                            </span>

                          </div>

                          <div className="
                            h-1.5
                            overflow-hidden
                            rounded-full
                            bg-[#EEE9E3]
                          ">

                            <div
                              className="h-full rounded-full bg-[#BD6A3C]"
                              style={{
                                width: `${Math.min(
                                  (coupon.usedCount /
                                    Math.max(
                                      coupon.usageLimit,
                                      1
                                    )) *
                                    100,
                                  100
                                )}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>


                      {/* Status */}

                      <td className="px-5 py-3.5">

                        {isExpired ? (

                          <StatusBadge
                            label="Expired"
                            className="bg-[#FDEAEA] text-[#C73A3A]"
                          />

                        ) : coupon.isActive ? (

                          <StatusBadge
                            label="Active"
                            className="bg-[#E7F5EB] text-[#26924D]"
                          />

                        ) : (

                          <StatusBadge
                            label="Inactive"
                            className="bg-[#F1EFEC] text-[#81796E]"
                          />

                        )}

                      </td>


                      {/* Actions */}

                      <td className="px-5 py-3.5">

                        <div className="flex items-center gap-1.5">

                          <ActionButton
                            title="Edit coupon"
                            onClick={() =>
                              openEditModal(coupon)
                            }
                            className="bg-[#E8F0FB] text-[#4676B9] hover:bg-[#D9E7F8]"
                          >
                            <Pencil size={14} />
                          </ActionButton>

                          <ActionButton
                            title={
                              coupon.isActive
                                ? "Deactivate coupon"
                                : "Activate coupon"
                            }
                            onClick={() =>
                              handleToggle(coupon._id)
                            }
                            className="bg-[#FFF4DC] text-[#9A7412] hover:bg-[#FCEBC1]"
                          >
                            <Power size={14} />
                          </ActionButton>

                          <ActionButton
                            title="Delete coupon"
                            onClick={() =>
                              handleDelete(coupon._id)
                            }
                            className="bg-[#FDEAEA] text-[#C73A3A] hover:bg-[#F9D8D8]"
                          >
                            <Trash2 size={14} />
                          </ActionButton>

                        </div>

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
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-[#292622]/50
          p-4
          backdrop-blur-sm
        ">

          <div className="
            relative
            max-h-[90vh]
            w-full
            max-w-xl
            overflow-y-auto
            rounded-[24px]
            border
            border-[#E8E2DA]
            bg-white
            shadow-[0_30px_80px_rgba(46,43,39,0.25)]
          ">

            {/* Modal Header */}

            <div className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              border-b
              border-[#EFEAE4]
              bg-white
              px-6
              py-5
            ">

              <div className="flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F3E1D3]
                  text-[#BD6A3C]
                ">
                  <TicketPercent size={19} />
                </div>

                <div>

                  <h2 className="text-lg font-black text-[#292622]">
                    {editingCoupon
                      ? "Edit Coupon"
                      : "Create Coupon"}
                  </h2>

                  <p className="text-[11px] text-[#938A80]">
                    Configure your promotional offer
                  </p>

                </div>

              </div>

              <button
                onClick={closeModal}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-[#938A80]
                  transition
                  hover:bg-[#F7F3EE]
                  hover:text-[#292622]
                "
              >
                <X size={17} />
              </button>

            </div>


            {/* Modal Content */}

            <div className="p-6">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <FormField label="Coupon Code">

                  <input
                    type="text"
                    value={form.code}
                    placeholder="WELCOME20"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    className={inputClass}
                  />

                </FormField>


                <FormField label="Discount Type">

                  <select
                    value={form.discountType}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discountType:
                          e.target.value as
                            | "percentage"
                            | "flat",
                      })
                    }
                    className={inputClass}
                  >

                    <option value="percentage">
                      Percentage
                    </option>

                    <option value="flat">
                      Flat Amount
                    </option>

                  </select>

                </FormField>


                <FormField label="Discount Value">

                  <input
                    type="number"
                    min="0"
                    value={form.discountValue}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        discountValue: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={inputClass}
                  />

                </FormField>


                <FormField label="Minimum Order">

                  <input
                    type="number"
                    min="0"
                    value={form.minimumOrder}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        minimumOrder: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={inputClass}
                  />

                </FormField>


                <FormField label="Maximum Discount">

                  <input
                    type="number"
                    min="0"
                    value={form.maxDiscount}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        maxDiscount: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={inputClass}
                  />

                </FormField>


                <FormField label="Usage Limit">

                  <input
                    type="number"
                    min="1"
                    value={form.usageLimit}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        usageLimit: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={inputClass}
                  />

                </FormField>


                <FormField
                  label="Expiry Date"
                  fullWidth
                >

                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        expiryDate: e.target.value,
                      })
                    }
                    className={inputClass}
                  />

                </FormField>

              </div>


              {/* Preview */}

              <div className="
                mt-5
                rounded-2xl
                border
                border-[#EDE7E0]
                bg-[#FAF7F2]
                p-4
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#BD6A3C]
                    shadow-sm
                  ">
                    <ShoppingCart size={16} />
                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A9185]">
                      Customer Offer
                    </p>

                    <p className="mt-0.5 text-sm font-black text-[#292622]">
                      {form.code || "COUPON CODE"}
                    </p>

                  </div>

                  <div className="ml-auto text-right">

                    <p className="text-lg font-black text-[#BD6A3C]">

                      {form.discountType === "percentage"
                        ? `${form.discountValue || 0}% OFF`
                        : `₹${form.discountValue || 0} OFF`}

                    </p>

                    <p className="text-[10px] text-[#9A9185]">
                      Min. ₹{form.minimumOrder || 0}
                    </p>

                  </div>

                </div>

              </div>


              {/* Buttons */}

              <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">

                <button
                  onClick={closeModal}
                  className="
                    rounded-xl
                    border
                    border-[#E2DCD5]
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-[#625A52]
                    transition
                    hover:bg-[#FAF7F2]
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="
                    rounded-xl
                    bg-[#BD6A3C]
                    px-6
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_18px_rgba(189,106,60,0.20)]
                    transition
                    hover:bg-[#A85A2F]
                  "
                >
                  {editingCoupon
                    ? "Update Coupon"
                    : "Create Coupon"}
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


/* =============================================================
   COMPACT STAT
============================================================= */

const CompactStat = ({
  label,
  value,
  icon,
  iconClass,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconClass: string;
}) => {
  return (
    <div className="
      rounded-[18px]
      border
      border-[#E8E2DA]
      bg-white
      p-4
      shadow-[0_6px_22px_rgba(46,43,39,0.035)]
    ">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A9185]">
            {label}
          </p>

          <p className="mt-1 text-xl font-black text-[#292622]">
            {value}
          </p>

        </div>

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            ${iconClass}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};


/* =============================================================
   TABLE HEAD
============================================================= */

const TableHead = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <th className="
      px-5
      py-3
      text-[9px]
      font-black
      uppercase
      tracking-[0.12em]
      text-[#9A9185]
    ">
      {children}
    </th>
  );
};


/* =============================================================
   STATUS BADGE
============================================================= */

const StatusBadge = ({
  label,
  className,
}: {
  label: string;
  className: string;
}) => {
  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-[9px]
        font-black
        uppercase
        tracking-wide
        ${className}
      `}
    >
      {label}
    </span>
  );
};


/* =============================================================
   ACTION BUTTON
============================================================= */

const ActionButton = ({
  children,
  onClick,
  title,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  className: string;
}) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
};


/* =============================================================
   FORM FIELD
============================================================= */

const FormField = ({
  label,
  children,
  fullWidth = false,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>

      <label className="
        mb-1.5
        block
        text-[11px]
        font-bold
        text-[#514B44]
      ">
        {label}
      </label>

      {children}

    </div>
  );
};


/* =============================================================
   INPUT CLASS
============================================================= */

const inputClass = `
  w-full
  rounded-xl
  border
  border-[#E4DED7]
  bg-white
  px-3.5
  py-2.5
  text-sm
  text-[#292622]
  outline-none
  transition
  placeholder:text-[#B0A79D]
  focus:border-[#BD6A3C]
  focus:ring-2
  focus:ring-[#BD6A3C]/10
`;


export default Coupons;