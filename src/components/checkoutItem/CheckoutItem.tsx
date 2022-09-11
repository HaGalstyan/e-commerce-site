import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { ICartItem } from "../carItem/CartItem";

interface ICheckoutItem {
  cartItem: ICartItem;
}

const CheckoutItem = ({ cartItem }: ICheckoutItem) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  const { imageUrl, name, price, quantity } = cartItem;

  const handleClearItem = () => clearItemFromCart(cartItem);
  const handleIncrease = () => addItemToCart(cartItem);
  const handleDecrease = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecrease}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncrease}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleClearItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
