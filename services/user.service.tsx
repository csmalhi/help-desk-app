
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { User } from "../models/user";

const UserService = {
  signIn: function (auth: any, email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User signed in!");
      })
      .catch((error: any) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
    
        console.error(error);
      });
  },
  signUp: function (auth: any, db: any, navigation: any, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserData(db, auth.currentUser)
        console.log("User account created & signed in!");
        navigation.navigate('Verify Email')
      })
      .catch((error: any) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
  },
  forgotPassword: function(auth: any, email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent, check your inbox.");
      })
      .catch((error: any) => {
        console.log(error);
      });
  },
  verifyEmail: function(auth: any, navigation: any) {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        navigation.navigate(['verify-email-address']);
      });
    }
  }
};

export default UserService;


const isLoggedIn = () => {
  // const user = JSON.parse(AsyncStorage.getItem('user')!);
  // return user !== null && user.emailVerified !== false ? true : false;
}

const userSignOut = () => {
  // signOut(auth).then(() => console.log("User signed ou!"));
}

const setUserData = async (db: any, user: any) => {
  const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
  const collection = await setDoc(doc(db, `users/${user.uid}`), userData).then(() => { console.log('Success adding resource')}).catch(error => console.log('error adding resource: ', error))
}
