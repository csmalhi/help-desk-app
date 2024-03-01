// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXQ9PeTwpB0kZk7sseBnlxVzdl5Z-2EPY",
  authDomain: "my-help-desk-app.firebaseapp.com",
  databaseURL: "https://my-help-desk-app-default-rtdb.firebaseio.com",
  projectId: "my-help-desk-app",
  storageBucket: "my-help-desk-app.appspot.com",
  messagingSenderId: "155545680872",
  appId: "1:155545680872:web:283891d31fd98c2c35825d"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
