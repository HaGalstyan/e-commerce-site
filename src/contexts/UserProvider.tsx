import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export interface IUserContext {
  currentUser: null;
  setCurrentUser: Dispatch<SetStateAction<any>>;
}

// as the actual value we want to access
export const UserContext: Context<IUserContext> = createContext({
  currentUser: null,
  setCurrentUser: (() => null) as Dispatch<SetStateAction<any>>,
});

export const UserProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
