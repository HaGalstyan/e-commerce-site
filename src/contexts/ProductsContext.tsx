import { Context, createContext, useState } from "react";
import { IProduct } from "../routes/shop/Shop";
import PRODUCTS from "../shop-data.json";

interface IProductsProvider {
  children: JSX.Element;
}

export interface IProductsContex {
  products: IProduct[] | [];
}

export const ProductsContex: Context<IProductsContex> = createContext({
  products: [] as IProduct[] | [],
});

export const ProductProvider = ({ children }: IProductsProvider) => {
  const [products] = useState<IProduct[]>(PRODUCTS);
  const value = { products };
  return (
    <ProductsContex.Provider value={value}>{children}</ProductsContex.Provider>
  );
};
