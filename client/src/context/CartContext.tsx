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

  pizza?: any;

  quantity: number;

  size: string;

  crust?: string;

  sauce?: string;

  cheese?: string;

  toppings?: string[];

  price: number;

  isCustomized?: boolean;

  customName?: string;

}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;

  addItem: (
    pizzaId: string,
    size: string,
    quantity: number,
    customization?: {

      name?: string;

      crust?: string;

      sauce?: string;

      cheese?: string;

      toppings?: string[];

      price?: number;

      isCustomized?: boolean;

    }

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
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart([]);
        return;
      }

      const res = await cartApi.getCart();

      setCart(res.data.cartItems || []);
    } catch (error) {
      console.log(error);
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
    quantity: number,
    customization?: {
      name?: string;

      crust?: string;

      sauce?: string;

      cheese?: string;

      toppings?: string[];

      price?: number;

      isCustomized?: boolean;
    }

  ) => {


    const payload = {

      pizzaId:
        pizzaId === ""
          ? null
          : pizzaId,

      quantity,

      size,

      ...customization,

    };


    await cartApi.addToCart(payload);


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