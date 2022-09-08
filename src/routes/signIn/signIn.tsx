import { UserCredential } from "firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import SignUpForm from "../../components/signUpForm/SignUpForm";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response: UserCredential = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
