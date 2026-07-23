import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import * as cartApi from "../api/cartApi";

interface CartItem {
  _id: string;
  pizza: any;
  quantity: number;
  size: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;

  addItem: (
    pizzaId: string,
    size: string,
    quantity: number
  ) => Promise<void>;

  updateItem: (
    id: string,
    quantity: number
  ) => Promise<void>;

  removeItem: (
    id: string
  ) => Promise<void>;

  clear: () => Promise<void>;
}

const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await cartApi.getCart();

      setCart(res.data.cartItems || []);

    } catch (error) {
      console.error(error);
      setCart([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (
    pizzaId: string,
    size: string,
    quantity: number
  ) => {
    await cartApi.addToCart({
      pizzaId,
      quantity,
      size,
    });

    await fetchCart();
  };

  const updateItem = async (
    id: string,
    quantity: number
  ) => {
    await cartApi.updateCart(
      id,
      quantity
    );

    await fetchCart();
  };

  const removeItem = async (
    id: string
  ) => {
    await cartApi.removeCartItem(id);

    await fetchCart();
  };

  const clear = async () => {
    await cartApi.clearCart();

    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addItem,
        updateItem,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);