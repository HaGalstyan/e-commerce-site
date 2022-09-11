import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ICartItem } from "../components/carItem/CartItem";
import { IProduct } from "../routes/shop/Shop";

interface ICartProvider {
  children: JSX.Element;
}

export interface ICartContext {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: ICartItem[];
  addItemToCart: (productToAdd: IProduct) => void;
  cartCount: number;
}

const addOrUpdateCartItem = (
  cartItems: ICartItem[],
  productToAdd: IProduct
): ICartItem[] => {
  const isItemExist = cartItems.find((item) => item.id === productToAdd.id);

  if (isItemExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext: Context<ICartContext> = createContext({
  isCartOpen: false as boolean,
  setIsCartOpen: (() => {}) as Dispatch<SetStateAction<boolean>>,
  cartItems: [] as ICartItem[],
  addItemToCart: (() => {}) as (productToAdd: IProduct) => void,
  cartCount: 0,
});

export const CartProvider = ({ children }: ICartProvider) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const addItemToCart = (productToAdd: IProduct) => {
    setCartItems(addOrUpdateCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total: number, cartItem: ICartItem): number => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
