import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  CustomParameters,
  User,
  UserCredential,
  Auth,
  NextOrObserver,
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
  WithFieldValue,
  collection,
  writeBatch,
  CollectionReference,
  WriteBatch,
  query,
  getDocs,
  QuerySnapshot,
  Query,
  QueryDocumentSnapshot,
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
const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

// Adding custom parameters
googleProvider.setCustomParameters({
  prompt: "select_account",
} as CustomParameters);

// Getting Auth instance
export const auth: Auth = getAuth();

// Creating Google Popup signIn func
export const signInWithGooglePopup: () => Promise<UserCredential> = () => {
  return signInWithPopup(auth, googleProvider);
};

// Creating Google Redirect signIn func
export const signInWithGoogleRedirect: () => Promise<never> = () => {
  return signInWithRedirect(auth, googleProvider);
};

// The Firestore instance of the provided app.
export const db: Firestore = getFirestore();

// Create Collection with documents at once
export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Record<string, any>[],
  field: string = "title"
) => {
  const batch: WriteBatch = writeBatch(db);
  const collectionRef: CollectionReference = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef: DocumentReference = doc(
      collectionRef,
      object[field].toLowerCase()
    );
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoryAndDocuments = async () => {
  const collectionRef: CollectionReference = collection(db, "catagories");
  const q: Query = query(collectionRef);

  const querySnapshot: QuerySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce(
    (acc: any, docSnapshot: QueryDocumentSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {}
  );

  return categoryMap;
};

// Returning reference to doc and if user doesn't exists adding him into DB
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation?: WithFieldValue<DocumentData>
) => {
  if (!userAuth) return;

  // Gets a 'DocumentReference' instance that refers to the document at the specified absolute path
  const userDocRef: DocumentReference = doc(db, "users", userAuth.uid);

  // Reading document referenced by userDocRef
  const userSnapshot: DocumentSnapshot = await getDoc(userDocRef);

  // Checking does user exist
  // If user doesn't exist creating user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //Setting new user passing document ref and new user data
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating new user", error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};
