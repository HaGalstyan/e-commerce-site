import { User } from "firebase/auth";
import { Unsubscribe } from "firebase/firestore";
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase";

type TUser = User | null;

interface IUserProvider {
  children: JSX.Element;
}
export interface IUserContext {
  currentUser: TUser;
  setCurrentUser: Dispatch<SetStateAction<TUser>>;
}

// as the actual value we want to access
export const UserContext: Context<IUserContext> = createContext({
  currentUser: null as TUser,
  setCurrentUser: (() => null) as Dispatch<SetStateAction<TUser>>,
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [currentUser, setCurrentUser] = useState<TUser>(null);
  const value: IUserContext = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChangedListener(
      (user: TUser) => {
        if (user) {
          createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      }
    );

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
