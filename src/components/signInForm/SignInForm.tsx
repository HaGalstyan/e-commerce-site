import { UserCredential } from "firebase/auth";
import { useState, useContext } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import Button, { BUTTON_TYPE } from "../button/Button";
import FormInput from "./formInput/FormInput";
import { IUserContext, UserContext } from "../../contexts/UserProvider";

export interface ISignInFormFields {
  email: string;
  password: string;
}

const defaultFormFields: ISignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] =
    useState<ISignInFormFields>(defaultFormFields);
  const { email, password }: ISignInFormFields = formFields;
  const { setCurrentUser }: IUserContext = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user }: UserCredential = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response: UserCredential | undefined =
        await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      if (!response) return;

      const { user } = response;
      setCurrentUser(user);
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        alert("Incorect password for email");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        alert("No user associated with this email");
      } else {
        console.log(error);
      }
    }
  };

  const formFieldsInfo = [
    {
      label: "Email",
      inputOptions: {
        type: "text",
        name: "email",
        onChange: handleChange,
        required: true,
        value: email,
      },
    },
    {
      label: "Password",
      inputOptions: {
        type: "password",
        name: "password",
        onChange: handleChange,
        required: true,
        value: password,
      },
    },
  ];

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {formFieldsInfo.map((formField, i) => {
          const { label, inputOptions } = formField;
          return (
            <FormInput label={label} inputOptions={inputOptions} key={i} />
          );
        })}
        <div className="buttons-container">
          <Button
            buttonProps={{ type: "submit" }}
            buttonType={BUTTON_TYPE.DEFAULT}
          >
            Sign In
          </Button>
          <Button
            buttonProps={{ type: "button" }}
            buttonType={BUTTON_TYPE.GOOGLE}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
