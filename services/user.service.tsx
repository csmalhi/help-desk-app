
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { User } from "../models/user";

const UserService = {
  signIn: function (auth: any, db: any, email: string, password: string, router: any) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        console.log("User signed in!");
        auth.currentUser.uid
        const usersResponse = await getDoc(doc(db, `users/${auth?.currentUser?.uid}`))
        const admin = usersResponse?.data()?.admin;
        if (admin) {
          router.push('/(admin-tickets)')
        } {
          router.push('/(tickets)')
        }
      })
      .catch((error: any) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
  },
  signUp: function (auth: any, db: any, router: any, email: string, password: string, admin: boolean) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setUserData(db, auth.currentUser, admin)
        console.log("User account created & signed in!");
        if (admin) {
          router.push('/(admin-tickets)')
        } else {
          router.push('/(tickets)')
        }
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
  verifyEmail: function(auth: any, router: any) {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        router.push(['/auth/verify-email-address']);
      });
    }
  }
};

const setUserData = async (db: any, user: any, admin: boolean = false) => {
  const userData: User = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    admin
  };
  const collection = await setDoc(doc(db, `users/${user.uid}`), userData).then(() => { console.log('Success adding resource')}).catch(error => console.log('error adding resource: ', error))
}

export default UserService;