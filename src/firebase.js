import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBLc4BrJ7h1beaHQATvoV7IfE5lxnIv_LQ",
  authDomain: "email-and-application-formats.firebaseapp.com",
  projectId: "email-and-application-formats",
  storageBucket: "email-and-application-formats.firebasestorage.app",
  messagingSenderId: "282124816259",
  appId: "1:282124816259:web:13fc66bda799ac21f870b6"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()


export {
  auth,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
}