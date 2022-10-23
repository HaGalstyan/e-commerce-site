import { useContext } from "react";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import { CategoryContext } from "../../contexts/CategoriesContext";

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Shop = () => {
  const { categoriesMap } = useContext(CategoryContext);
  if (!categoriesMap) return null;

  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title, index) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} products={products} title={title} />
        );
      })}
    </div>
  );
};

export default Shop;
