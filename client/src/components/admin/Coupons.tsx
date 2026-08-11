import { useEffect, useMemo, useState } from "react";

import {
    Search,
    Plus,
    TicketPercent,
    Trash2,
    Pencil,
    Power,
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

    const fetchCoupons = async () => {
        try {
            const res = await getCoupons();

            setCoupons(res.data.coupons || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const filteredCoupons = useMemo(() => {
        return coupons.filter((coupon) =>
            coupon.code
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [coupons, search]);

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

    if (!form.expiryDate) {
      alert("Please select an expiry date");
      return;
    }

    if (editingCoupon) {
      await updateCoupon(editingCoupon._id, form);
    } else {
      await createCoupon(form);
    }

    setShowModal(false);
    setEditingCoupon(null);
    setForm(initialForm);

    fetchCoupons();
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};


    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this coupon?")) return;

        try {
            await deleteCoupon(id);

            fetchCoupons();
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            await toggleCouponStatus(id);

            fetchCoupons();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F6F3] p-6 lg:p-10">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

                    <div>

                        <h1 className="text-4xl font-black text-[#2E2B27]">
                            Coupons Management
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create and manage discount coupons.
                        </p>

                    </div>

                    <button
                        onClick={openCreateModal}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#BD6A3C] text-white font-bold hover:bg-[#A85A2F] transition"
                    >
                        <Plus size={18} />

                        Add Coupon
                    </button>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-3xl p-6 border shadow-sm">

                        <p className="text-gray-500">
                            Total Coupons
                        </p>

                        <h2 className="text-4xl font-black mt-2">
                            {coupons.length}
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl p-6 border shadow-sm">

                        <p className="text-gray-500">
                            Active
                        </p>

                        <h2 className="text-4xl font-black text-green-600 mt-2">
                            {
                                coupons.filter(
                                    (c) => c.isActive
                                ).length
                            }
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl p-6 border shadow-sm">

                        <p className="text-gray-500">
                            Expired
                        </p>

                        <h2 className="text-4xl font-black text-red-500 mt-2">
                            {
                                coupons.filter(
                                    (c) =>
                                        new Date(c.expiryDate) < new Date()
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                {/* Search */}

                <div className="relative mb-6 max-w-md">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search coupon..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full bg-white rounded-2xl border pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BD6A3C]"
                    />

                </div>

                {/* Table */}

                <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

                    <div className="flex items-center gap-3 px-6 py-5 border-b">

                        <TicketPercent className="text-[#BD6A3C]" />

                        <h2 className="text-2xl font-black">
                            Coupons
                        </h2>

                    </div>

                    {loading ? (

                        <div className="py-20 text-center">

                            Loading...

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-[#FAF7F2]">

                                    <tr className="text-left text-sm uppercase text-gray-500">

                                        <th className="px-6 py-4">Code</th>

                                        <th className="px-6 py-4">Discount</th>

                                        <th className="px-6 py-4">Minimum</th>

                                        <th className="px-6 py-4">Expiry</th>

                                        <th className="px-6 py-4">Usage</th>

                                        <th className="px-6 py-4">Status</th>

                                        <th className="px-6 py-4">Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredCoupons.map((coupon) => (

                                        <tr
                                            key={coupon._id}
                                            className="border-b hover:bg-[#FAF7F2]"
                                        >

                                            <td className="px-6 py-5 font-bold">
                                                {coupon.code}
                                            </td>

                                            <td className="px-6 py-5">

                                                {coupon.discountType === "percentage"
                                                    ? `${coupon.discountValue}%`
                                                    : `₹${coupon.discountValue}`}

                                            </td>

                                            <td className="px-6 py-5">
                                                ₹{coupon.minimumOrder}
                                            </td>

                                            <td className="px-6 py-5">
                                                {new Date(
                                                    coupon.expiryDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-5">
                                                {coupon.usedCount}/{coupon.usageLimit}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold ${coupon.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {coupon.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() =>
                                                            openEditModal(coupon)
                                                        }
                                                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleToggle(coupon._id)
                                                        }
                                                        className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                    >
                                                        <Power size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(coupon._id)
                                                        }
                                                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                    {/* ================= Modal ================= */}

                    {showModal && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

                            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative">

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute right-5 top-5 text-2xl text-gray-500 hover:text-black"
                                >
                                    ✕
                                </button>

                                <h2 className="text-3xl font-black text-[#2E2B27] mb-8">
                                    {editingCoupon ? "Edit Coupon" : "Create Coupon"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* Coupon Code */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Coupon Code
                                        </label>

                                        <input
                                            type="text"
                                            value={form.code}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    code: e.target.value.toUpperCase(),
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#BD6A3C] outline-none"
                                        />

                                    </div>

                                    {/* Discount Type */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Discount Type
                                        </label>

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
                                            className="w-full border rounded-xl px-4 py-3"
                                        >
                                            <option value="percentage">
                                                Percentage
                                            </option>

                                            <option value="flat">
                                                Flat
                                            </option>

                                        </select>

                                    </div>

                                    {/* Discount Value */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Discount Value
                                        </label>

                                        <input
                                            type="number"
                                            value={form.discountValue}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    discountValue: Number(e.target.value),
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3"
                                        />

                                    </div>

                                    {/* Minimum Order */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Minimum Order
                                        </label>

                                        <input
                                            type="number"
                                            value={form.minimumOrder}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    minimumOrder: Number(e.target.value),
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3"
                                        />

                                    </div>

                                    {/* Maximum Discount */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Maximum Discount
                                        </label>

                                        <input
                                            type="number"
                                            value={form.maxDiscount}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    maxDiscount: Number(e.target.value),
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3"
                                        />

                                    </div>

                                    {/* Usage Limit */}

                                    <div>

                                        <label className="block font-semibold mb-2">
                                            Usage Limit
                                        </label>

                                        <input
                                            type="number"
                                            value={form.usageLimit}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    usageLimit: Number(e.target.value),
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3"
                                        />

                                    </div>

                                    {/* Expiry Date */}

                                    <div className="md:col-span-2">

                                        <label className="block font-semibold mb-2">
                                            Expiry Date
                                        </label>

                                        <input
                                            type="date"
                                            value={form.expiryDate}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    expiryDate: e.target.value,
                                                })
                                            }
                                            className="w-full border rounded-xl px-4 py-3"
                                        />

                                    </div>

                                </div>

                                <div className="flex justify-end gap-4 mt-8">

                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3 rounded-xl border font-semibold"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleSave}
                                        className="px-8 py-3 rounded-xl bg-[#BD6A3C] hover:bg-[#A85A2F] text-white font-bold transition"
                                    >
                                        {editingCoupon ? "Update Coupon" : "Create Coupon"}
                                    </button>

                                </div>

                            </div>

                        </div>
                    )}

            </div>
