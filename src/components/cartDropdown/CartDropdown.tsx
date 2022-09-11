import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Button, { BUTTON_TYPE } from "../button/Button";
import CartItem from "../carItem/CartItem";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </div>
      <Button buttonProps={{ type: "button" }} buttonType={BUTTON_TYPE.DEFAULT}>
        Go To Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
