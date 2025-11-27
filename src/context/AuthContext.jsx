import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "@/lib/firebase";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER USER
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN USER (EMAIL + PASSWORD)
  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // LOGIN WITH GOOGLE
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // UPDATE USER PROFILE
  const updateUser = ({ photoURL, displayName }) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { photoURL, displayName });
  };

  // LOGOUT
  const signOutUser = () => {
    setLoading(true);
    Cookies.remove("token");
    return signOut(auth);
  };

  // TRACK LOGIN STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();

        // Save token in cookie
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
        });

        setUser(currentUser);
      } else {
        Cookies.remove("token");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInWithEmail,
    signInWithGoogle,
    updateUser,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
