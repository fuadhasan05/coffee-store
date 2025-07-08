// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZzg6ZfYC-S9pHYUzgTZWvMWEAQHVAu6w",
  authDomain: "coffee-store-25.firebaseapp.com",
  projectId: "coffee-store-25",
  storageBucket: "coffee-store-25.firebasestorage.app",
  messagingSenderId: "793433878535",
  appId: "1:793433878535:web:e10613c50546ea7dc8faa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
