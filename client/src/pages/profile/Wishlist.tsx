import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import toast from "react-hot-toast";

const IMAGE_URL = "http://localhost:5000";

const Wishlist = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { wishlist, loading, toggleWishlist } = useWishlist();

  const [addingId, setAddingId] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleAddToCart = async (pizza: (typeof wishlist)[number]) => {
    const size = pizza.sizes?.[0]?.size;

    if (!size) {
      toast.error("This pizza has no available size.");
      return;
    }

    try {
      setAddingId(pizza._id);

      await addItem(pizza._id, size, 1);

      toast.success(`${pizza.name} added to cart!`);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please log in to add items to your cart.");
        navigate("/login");
      } else {
        toast.error("Unable to add pizza to cart.");
      }
    } finally {
      setAddingId(null);
    }
  };

  const removeItem = async (pizzaId: string) => {
    try {
      setRemovingId(pizzaId);
      await toggleWishlist(pizzaId);
    } catch (error) {
      toast.error("Couldn't remove this pizza.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#D8531F]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 sm:px-6 lg:px-10 pt-28 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="
                w-11
                h-11
                rounded-2xl
                bg-white
                border
                border-[#E8DED2]
                flex
                items-center
                justify-center
                text-[#22281F]
                shadow-sm
                hover:-translate-x-1
                hover:border-[#D8531F]
                hover:text-[#D8531F]
                transition-all
              "
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <div className="flex items-center gap-3">

                <h1 className="text-3xl sm:text-4xl font-black text-[#22281F]">
                  My Wishlist
                </h1>

                <div className="w-9 h-9 rounded-full bg-[#FCE4D6] flex items-center justify-center text-[#D8531F]">
                  <Heart size={18} className="fill-[#D8531F]" />
                </div>

              </div>

              <p className="text-sm text-[#756B61] mt-1">
                Your favourite pizzas, saved for later.
              </p>
            </div>

          </div>

          <div className="bg-white border border-[#E8DED2] rounded-2xl px-5 py-3 flex items-center gap-4 shadow-sm">

            <div>
              <p className="text-xs text-[#81776D] font-medium">
                SAVED PIZZAS
              </p>

              <p className="text-2xl font-black text-[#D8531F]">
                {wishlist.length}
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-[#FFF3EA] flex items-center justify-center">
              <Heart size={17} className="text-[#D8531F]" />
            </div>

          </div>

        </div>

        {/* ================= WISHLIST ================= */}

        {wishlist.length > 0 ? (

          <div className="space-y-4">

            {wishlist.map((pizza) => {
              const startingPrice = pizza.sizes?.[0]?.price ?? 0;

              return (
                <div
                  key={pizza._id}
                  className="
                    group
                    bg-white
                    rounded-3xl
                    border
                    border-[#E9E0D7]
                    shadow-[0_8px_30px_rgba(46,43,39,0.06)]
                    hover:shadow-[0_15px_40px_rgba(46,43,39,0.10)]
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                    overflow-hidden
                    p-3
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                  "
                >

                  <div className="relative w-full sm:w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-[#F7F2EC]">

                    <img
                      src={
                        pizza.image?.startsWith("http")
                          ? pizza.image
                          : `${IMAGE_URL}${pizza.image}`
                      }
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span
                      className={`
                        absolute
                        top-3
                        left-3
                        px-2.5
                        py-1
                        rounded-full
                        text-[10px]
                        font-extrabold
                        tracking-wide
                        backdrop-blur-md
                        shadow-sm
                        ${
                          pizza.category === "Veg"
                            ? "bg-white/90 text-green-600"
                            : "bg-white/90 text-[#756B61]"
                        }
                      `}
                    >
                      {pizza.category}
                    </span>

                  </div>

                  <div className="flex-1 min-w-0 py-1 sm:py-2 px-1 sm:px-2">

                    <div className="flex justify-between gap-4">

                      <div className="min-w-0">

                        <h2 className="text-xl sm:text-2xl font-black text-[#22281F] truncate">
                          {pizza.name}
                        </h2>

                        <div className="flex items-center gap-2 mt-2">

                          <div className="flex items-center gap-1 bg-[#FFF7E6] px-2 py-1 rounded-full">
                            <Star size={13} className="fill-[#F5B400] text-[#F5B400]" />
                            <span className="text-xs font-bold text-[#5A5148]">
                              {pizza.rating?.toFixed(1) ?? "New"}
                            </span>
                          </div>

                          <span className="text-xs text-[#9A9188]">
                            {pizza.category}
                          </span>

                        </div>

                      </div>

                      <button
                        onClick={() => removeItem(pizza._id)}
                        disabled={removingId === pizza._id}
                        className="w-9 h-9 rounded-full bg-[#FFF5F0] flex items-center justify-center flex-shrink-0 hover:bg-[#FCE4D6] transition disabled:opacity-50"
                        title="Remove from wishlist"
                      >
                        <Heart size={18} className="fill-[#D8531F] text-[#D8531F]" />
                      </button>

                    </div>

                    <p className="text-sm text-[#756B61] mt-3 line-clamp-1 max-w-xl">
                      {pizza.description}
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#9A9188]">
                          Starting from
                        </p>
                        <p className="text-2xl font-black text-[#D8531F]">
                          ₹{startingPrice}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => handleAddToCart(pizza)}
                          disabled={addingId === pizza._id}
                          className="
                            px-6
                            py-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-[#D8531F]
                            to-[#B8431A]
                            text-white
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2
                            shadow-[0_8px_24px_rgba(216,83,31,0.22)]
                            hover:shadow-[0_12px_30px_rgba(216,83,31,0.30)]
                            hover:-translate-y-0.5
                            active:translate-y-0
                            transition-all
                            duration-300
                            disabled:opacity-60
                            disabled:cursor-not-allowed
                          "
                        >
                          {addingId === pizza._id ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Adding
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={18} />
                              Add to Cart
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => removeItem(pizza._id)}
                          disabled={removingId === pizza._id}
                          className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            border-[#F0D6D0]
                            bg-white
                            text-[#D8531F]
                            flex
                            items-center
                            justify-center
                            hover:bg-[#FFF1EC]
                            hover:border-[#D8531F]
                            transition-all
                            disabled:opacity-50
                          "
                          title="Remove from wishlist"
                        >
                          {removingId === pizza._id ? (
                            <Loader2 size={17} className="animate-spin" />
                          ) : (
                            <Trash2 size={17} />
                          )}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          <div className="bg-white border border-[#E8DED2] rounded-3xl py-16 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#FCE4D6] flex items-center justify-center">
              <Heart size={28} className="text-[#D8531F]" />
            </div>

            <h2 className="text-2xl font-black text-[#22281F] mt-5">
              Your wishlist is empty
            </h2>

            <p className="text-[#81776D] mt-2">
              Tap the heart on any pizza to save it here.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="mt-6 px-6 py-3 rounded-xl bg-[#D8531F] text-white font-bold hover:bg-[#B8431A] transition"
            >
              Browse Menu
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default Wishlist;