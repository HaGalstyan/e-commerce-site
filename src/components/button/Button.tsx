export enum BUTTON_TYPE {
  DEFAULT = "DEFAULT",
  INVERTED = "INVERTED",
  GOOGLE = "GOOGLE",
}

const BUTTON_TYPE_CLASSES: Record<BUTTON_TYPE, string> = {
  [BUTTON_TYPE.INVERTED]: "inverted",
  [BUTTON_TYPE.DEFAULT]: "default",
  [BUTTON_TYPE.GOOGLE]: "google-sign-in",
};

export interface IButton {
  type: "button" | "submit" | "reset" | undefined;
}

interface IButtonComponent {
  children: any;
  buttonType: BUTTON_TYPE;
  buttonProps: IButton;
}

const Button = ({ children, buttonType, buttonProps }: IButtonComponent) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
