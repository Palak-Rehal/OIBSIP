import { useEffect, useMemo, useState } from "react";
import { getAllReviews } from "../../api/adminApi";

import {
    Search,
    Star,
    MessageSquare,
    CheckCircle2,
    Eye,
    X,
} from "lucide-react";

interface Review {
    _id: string;

    user: {
        _id: string;
        name: string;
        email?: string;
        profileImage?: string;
    };

    pizza: {
        _id: string;
        name: string;
    };

    rating: number;
    comment: string;
    createdAt: string;
}

const Reviews = () => {
    const [search, setSearch] = useState("");
    const [selectedReview, setSelectedReview] =
        useState<Review | null>(null);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const res = await getAllReviews();

            setReviews(res.data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchReviews();
    }, []);

    const filteredReviews = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return reviews;

        return reviews.filter(
            (review) =>
                review.user.name.toLowerCase().includes(query) ||
                review.pizza.name.toLowerCase().includes(query) ||
                review.comment.toLowerCase().includes(query)
        );
    }, [reviews, search]);

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
            ).toFixed(1)
            : "0.0";

    const publishedCount = reviews.length;

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={13}
                        className={
                            star <= rating
                                ? "fill-[#E59A52] text-[#E59A52]"
                                : "text-gray-300"
                        }
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-[1500px] mx-auto pb-8">

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

                        <span className="text-[10px] font-black uppercase tracking-[2px] text-[#BD6A3C]">
                            PizzaHub Admin
                        </span>
                    </div>

                    <h1 className="text-3xl font-black tracking-tight text-[#24211F]">
                        Reviews
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Monitor customer feedback and ratings.
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full lg:w-[280px]">
                    <Search
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search reviews..."
                        className="
              w-full h-10
              rounded-xl
              border border-[#E7DED7]
              bg-white
              pl-10 pr-4
              text-sm
              outline-none
              shadow-sm
              focus:border-[#BD6A3C]
              focus:ring-4
              focus:ring-[#BD6A3C]/10
            "
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

                <div className="rounded-2xl border border-[#E9E1DA] bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500">
                                Total Reviews
                            </p>

                            <p className="text-2xl font-black text-[#24211F] mt-1">
                                {reviews.length}
                            </p>
                        </div>

                        <div className="h-9 w-9 rounded-xl bg-[#FBE8DC] flex items-center justify-center">
                            <MessageSquare
                                size={17}
                                className="text-[#BD6A3C]"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#E9E1DA] bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500">
                                Average Rating
                            </p>

                            <p className="text-2xl font-black text-[#E59A52] mt-1">
                                {averageRating}
                            </p>
                        </div>

                        <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Star
                                size={17}
                                className="fill-[#E59A52] text-[#E59A52]"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#E9E1DA] bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500">
                                Published
                            </p>

                            <p className="text-2xl font-black text-emerald-600 mt-1">
                                {publishedCount}
                            </p>
                        </div>

                        <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2
                                size={17}
                                className="text-emerald-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-[#E9E1DA] bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500">
                                5 Star Reviews
                            </p>

                            <p className="text-2xl font-black text-[#BD6A3C] mt-1">
                                {reviews.filter((r) => r.rating === 5).length}
                            </p>
                        </div>

                        <div className="h-9 w-9 rounded-xl bg-[#F8F1EB] flex items-center justify-center">
                            <Star
                                size={17}
                                className="fill-[#BD6A3C] text-[#BD6A3C]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Card */}
            <div className="rounded-2xl border border-[#E9E1DA] bg-white shadow-sm overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEE7E1]">

                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-[#FBE8DC] flex items-center justify-center">
                            <MessageSquare
                                size={17}
                                className="text-[#BD6A3C]"
                            />
                        </div>

                        <div>
                            <h2 className="text-base font-black text-[#24211F]">
                                Customer Reviews
                            </h2>

                            <p className="text-[11px] text-gray-400">
                                {filteredReviews.length} review
                                {filteredReviews.length !== 1 ? "s" : ""}
                            </p>
                        </div>
                    </div>

                </div>

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto h-10 w-10 rounded-full border-4 border-[#E9E1DA] border-t-[#BD6A3C] animate-spin" />

                        <p className="text-sm text-gray-500 mt-4">
                            Loading reviews...
                        </p>
                    </div>
                ) : filteredReviews.length === 0 ? (
                    <div className="py-20 text-center">

                        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#F8F3EF] flex items-center justify-center mb-4">
                            <MessageSquare
                                size={24}
                                className="text-[#BD6A3C]"
                            />
                        </div>

                        <h3 className="text-sm font-black text-[#2E2B27]">
                            No reviews yet
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                            Customer reviews will appear here once they are submitted.
                        </p>

                    </div>
                ) : (
                    <div className="divide-y divide-[#F0EBE7]">

                        {filteredReviews.map((review) => (
                            <div
                                key={review._id}
                                className="px-5 py-4 hover:bg-[#FCFAF8] transition"
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div className="flex gap-3 min-w-0">

                                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[#BD6A3C] to-[#E7A06F] text-white flex items-center justify-center font-black">
                                            {review.user.name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="min-w-0">

                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-[#2E2B27]">
                                                    {review.user.name}
                                                </p>

                                                {renderStars(review.rating)}
                                            </div>

                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                {review.pizza.name}
                                            </p>

                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                {review.comment}
                                            </p>

                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedReview(review)}
                                        className="
                      shrink-0
                      h-8 w-8
                      rounded-lg
                      border border-[#E5D8CE]
                      flex items-center justify-center
                      text-[#BD6A3C]
                      hover:bg-[#BD6A3C]
                      hover:text-white
                      transition
                    "
                                    >
                                        <Eye size={14} />
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedReview && (
                <div
                    className="
            fixed inset-0 z-[100]
            bg-[#1C1714]/50
            backdrop-blur-sm
            flex items-center justify-center
            p-4
          "
                    onClick={() => setSelectedReview(null)}
                >
                    <div
                        className="
              w-full max-w-md
              rounded-3xl
              bg-white
              shadow-2xl
              p-6
              relative
            "
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={() => setSelectedReview(null)}
                            className="absolute right-5 top-5 h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                        >
                            <X size={16} />
                        </button>

                        <p className="text-[10px] uppercase tracking-[2px] font-black text-[#BD6A3C]">
                            Customer Review
                        </p>

                        <h2 className="text-xl font-black text-[#24211F] mt-1">
                            {selectedReview.pizza.name}
                        </h2>

                        <div className="mt-4">
                            {renderStars(selectedReview.rating)}
                        </div>

                        <p className="text-sm text-gray-600 leading-6 mt-4">
                            {selectedReview.comment}
                        </p>

                        <div className="mt-5 pt-4 border-t border-gray-100">
                            <p className="text-sm font-bold">
                                {selectedReview.user.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                {selectedReview.user.email || "Customer"}
                            </p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Reviews;