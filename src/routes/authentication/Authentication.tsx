import SignUpForm from "../../components/signUpForm/SignUpForm";
import SignInForm from "../../components/signInForm/SignInForm";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
