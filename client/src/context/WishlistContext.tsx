import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Pizza } from "../types/pizza";
import * as wishlistApi from "../api/wishlistApi";

interface WishlistContextType {
  wishlist: Pizza[];
  loading: boolean;

  isWishlisted: (pizzaId: string) => boolean;

  toggleWishlist: (pizzaId: string) => Promise<void>;

  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);

      const res = await wishlistApi.getWishlist();

      setWishlist(res.data.pizzas || []);
    } catch (error) {
      // Not logged in or request failed — leave wishlist empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isWishlisted = (pizzaId: string) =>
    wishlist.some((p) => p._id === pizzaId);

  const toggleWishlist = async (pizzaId: string) => {
    const alreadyIn = isWishlisted(pizzaId);

    if (alreadyIn) {
      await wishlistApi.removeFromWishlist(pizzaId);
    } else {
      await wishlistApi.addToWishlist(pizzaId);
    }

    await fetchWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isWishlisted,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider"
    );
  }

  return context;
};