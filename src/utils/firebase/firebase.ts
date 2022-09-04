import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  CustomParameters,
  User,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

// Firebase configs provided from Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA5hWslGXgc6TXMPPJ_nfqMuan7FYMkkzA",
  authDomain: "e-commerce-site-4ab50.firebaseapp.com",
  projectId: "e-commerce-site-4ab50",
  storageBucket: "e-commerce-site-4ab50.appspot.com",
  messagingSenderId: "319128986430",
  appId: "1:319128986430:web:78e3ade3355f35ed0bc26f",
};

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Creating Google auth provider
const provider: GoogleAuthProvider = new GoogleAuthProvider();

// Adding custom parameters
provider.setCustomParameters({
  prompt: "select_account",
} as CustomParameters);

// Getting Auth instansce
export const auth = getAuth();

// Creating Google Popup signin func
export const signInWithGooglePopup: () => Promise<UserCredential> = () => {
  return signInWithPopup(auth, provider);
};

export const db: Firestore = getFirestore();

// Returning reference to doc and if user doesn't exists adding him into DB
export const createUserDocumentFromAuth = async (userAuth: User) => {
  // Getting reference to document with absolute path 'users' and userID
  const userDocRef: DocumentReference<DocumentData> = doc(
    db,
    "users",
    userAuth.uid
  );

  // Reading document referenced by userDocRef
  const userSnapshot: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);

  // Checking does user exist
  // If user doesn't exist creating user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //Setting new user
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating new user", error);
    }
  }

  return userDocRef;
};
