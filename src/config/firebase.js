// Import Firebase functions
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

// ✅ Firebase configuration (storageBucket ঠিক করা হয়েছে)
const firebaseConfig = {
  apiKey: "AIzaSyBoT7SxaFf34JyDQDs9hTMcosZshSMQz0E",
  authDomain: "chat-app-28d94.firebaseapp.com",
  projectId: "chat-app-28d94",
  storageBucket: "chat-app-28d94.appspot.com", // ✅ fixed
  messagingSenderId: "234518687201",
  appId: "1:234518687201:web:932eef72362d8e4e4ef6a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 Sign up new user
const signup = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Login with email/password
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Google login
const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Password reset
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

// 🔹 Logout user
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Export everything
export { auth, signup, login, googleLogin, resetPassword, logout };
