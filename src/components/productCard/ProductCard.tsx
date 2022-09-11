import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IProduct } from "../../routes/shop/Shop";
import Button, { BUTTON_TYPE } from "../button/Button";

interface IPRoductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IPRoductCard) => {
  const { imageUrl, name, price }: IProduct = product;
  const { addItemToCart } = useContext(CartContext);

  const handleAddProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{`${price}$`}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE.INVERTED}
        buttonProps={{ type: "button" }}
        onClick={handleAddProductToCart}
      >
        Add to Card
      </Button>
    </div>
  );
};

export default ProductCard;
