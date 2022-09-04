import { UserCredential } from "firebase/auth";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";

const SignIn = () => {
  const logGoogleUser = async () => {
    const response: UserCredential = await signInWithGooglePopup();
    await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google Popup</button>
    </div>
  );
};

export default SignIn;
