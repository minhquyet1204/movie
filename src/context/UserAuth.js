import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";

import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
const UserAuth = createContext();

const UserAuthProvider = ({ children }) => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLogin = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const docRef = doc(db, "user", currentUser?.email);
      await onSnapshot(docRef, (doc) => setMovies(doc.data()?.favoriteMovie));

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setDoc(docRef, {
          favoriteMovie: [],
        });
      }
    });

    return () => {
      userLogin();
    };
  }, [user]);

  const handleLogOut = () => {
    return signOut(auth);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <UserAuth.Provider
      value={{ googleSignIn, user, handleLogOut, createUser, signIn, movies }}
    >
      {children}
    </UserAuth.Provider>
  );
};

export const UserContext = () => {
  return useContext(UserAuth);
};

export default UserAuthProvider;
