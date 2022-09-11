import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import Button, { BUTTON_TYPE } from "../button/Button";
import CartItem from "../carItem/CartItem";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckouthandler = () => {
    navigate("checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </div>
      <Button
        buttonProps={{ type: "button" }}
        buttonType={BUTTON_TYPE.DEFAULT}
        onClick={goToCheckouthandler}
      >
        Go To Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
