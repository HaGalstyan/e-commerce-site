import Button, { BUTTON_TYPE } from "../button/Button";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button buttonProps={{ type: "button" }} buttonType={BUTTON_TYPE.DEFAULT}>
        Go To Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
