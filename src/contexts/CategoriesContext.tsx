import { Context, createContext, useEffect, useState } from "react";
import { IProduct } from "../routes/shop/Shop";
import { getCategoryAndDocuments } from "../utils/firebase/firebase";

interface IProductsProvider {
  children: JSX.Element;
}

export interface ICategoryContext {
  categoriesMap: Record<string, IProduct[]> | undefined;
}

export const CategoryContext: Context<ICategoryContext> = createContext({
  categoriesMap: undefined as Record<string, IProduct[]> | undefined,
});

export const CategoriesProvider = ({ children }: IProductsProvider) => {
  const [categoriesMap, setCategoriesMap] =
    useState<Record<string, IProduct[]>>();
  const value = { categoriesMap };

  const getCategoriesMap = async () => {
    const categoryMap = await getCategoryAndDocuments();
    setCategoriesMap(categoryMap);
  };

  useEffect(() => {
    getCategoriesMap();
  }, []);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
