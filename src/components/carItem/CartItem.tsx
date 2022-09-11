import { IProduct } from "../../routes/shop/Shop";

export interface ICartItem extends IProduct {
  quantity: number;
}

interface ICartItemProps {
  cartItem: ICartItem;
}

const CartItem = ({ cartItem }: ICartItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">{`${quantity} x $${price}`}</span>
      </div>
    </div>
  );
};

export default CartItem;
