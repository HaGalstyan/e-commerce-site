import { IProduct } from "../../routes/shop/Shop";
import ProductCard from "../productCard/ProductCard";

interface ICategoryPreview {
  title: string;
  products: IProduct[];
}

const CategoryPreview = ({ title, products }: ICategoryPreview) => {
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
        {products
          .filter((_, index: number) => index < 4)
          .map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
