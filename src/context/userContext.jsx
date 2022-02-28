import { createContext, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "../firebase";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const signup = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const handleAdd = async (name, price) => {
    const collectionRef = collection(db, "coinWatchList");
    const payload = { name, price };
    await addDoc(collectionRef, payload);
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "coinWatchList", id);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        signup,
        login,
        googleSignIn,
        logout,
        handleAdd,
        handleDelete,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
