// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtjyfSXQWgYZhVkX3J6IWF_5SlXRnnfbk",
  authDomain: "holidaysri-33f46.firebaseapp.com",
  projectId: "holidaysri-33f46",
  storageBucket: "holidaysri-33f46.appspot.com",
  messagingSenderId: "427937843625",
  appId: "1:427937843625:web:7effdc34df8d935dab5cb8",
  measurementId: "G-DK5LF9V3SK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account", // Ensures the "Choose an account" popup is displayed every time
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => {
  try {
      const result = await signInWithPopup(auth, googleProvider);
      // Successful sign-in
      console.log("User signed in successfully:", result.user.displayName);
      return result; // Return the result if needed
  } catch (error) {
      // Handle errors during sign-in
      console.error("Error signing in with Google:", error);
      throw error; // Rethrow the error if needed
  }
};
