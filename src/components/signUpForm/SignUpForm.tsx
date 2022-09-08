import { UserCredential } from "firebase/auth";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import Button, { BUTTON_TYPE } from "../button/Button";
import FormInput, { IFormInput } from "./formInput/FormInput";

export interface IFormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultFormFields: IFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState<IFormFields>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (formFields.password !== formFields.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response: UserCredential | undefined =
        await createAuthUserWithEmailAndPassword(email, password);

      if (!response) return;

      createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Can not create user, email already in use");
      } else {
        console.log("User creation encounter an error", error);
      }
    }
  };

  const formFieldsInfo: IFormInput[] = [
    {
      label: "Display Name",
      inputOptions: {
        type: "text",
        name: "displayName",
        onChange: handleChange,
        required: true,
        value: displayName,
      },
    },
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
    {
      label: "Confirm Password",
      inputOptions: {
        type: "password",
        name: "confirmPassword",
        onChange: handleChange,
        required: true,
        value: confirmPassword,
      },
    },
  ];

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        {formFieldsInfo.map((formField, i) => {
          const { label, inputOptions } = formField;
          return (
            <FormInput label={label} inputOptions={inputOptions} key={i} />
          );
        })}
        <Button
          buttonProps={{ type: "submit" }}
          buttonType={BUTTON_TYPE.DEFAULT}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
