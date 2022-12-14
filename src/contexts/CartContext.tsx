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
  removeItemFromCart: (productToAdd: IProduct) => void;
  clearItemFromCart: (productToAdd: IProduct) => void;
  cartCount: number;
  cartTotal: number;
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

const removeOrUpdateCartItem = (
  cartItems: ICartItem[],
  productToRemove: IProduct
) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: ICartItem[], productToClear: IProduct) =>
  cartItems.filter((item) => item.id !== productToClear.id);

export const CartContext: Context<ICartContext> = createContext({
  isCartOpen: false as boolean,
  setIsCartOpen: (() => {}) as Dispatch<SetStateAction<boolean>>,
  cartItems: [] as ICartItem[],
  addItemToCart: (() => {}) as (productToAdd: IProduct) => void,
  removeItemFromCart: (() => {}) as (productToRemove: IProduct) => void,
  clearItemFromCart: (() => {}) as (productToClear: IProduct) => void,
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }: ICartProvider) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  const addItemToCart = (productToAdd: IProduct) => {
    setCartItems(addOrUpdateCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove: IProduct) => {
    setCartItems(removeOrUpdateCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToCLear: IProduct) => {
    setCartItems(clearCartItem(cartItems, productToCLear));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total: number, cartItem: ICartItem): number => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total: number, cartItem: ICartItem): number => {
        return total + cartItem.quantity * cartItem.price;
      },
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
