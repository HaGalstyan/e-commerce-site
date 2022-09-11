import { useContext } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { ProductsContex } from "../../contexts/ProductsContext";

export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const Shop = () => {
  const { products } = useContext(ProductsContex);

  return (
    <div className="products-container">
      {products.map((product: IProduct) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Shop;
