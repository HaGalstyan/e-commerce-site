import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ICartProvider {
  children: JSX.Element;
}

export interface ICartContext {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartContext: Context<ICartContext> = createContext({
  isCartOpen: false as boolean,
  setIsCartOpen: (() => {}) as Dispatch<SetStateAction<boolean>>,
});

export const CartProvider = ({ children }: ICartProvider) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
