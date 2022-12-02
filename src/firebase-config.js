import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCX0mmv7vaGIYD2mVD8xfkvo_ZdmUslH6M",
    authDomain: "blogs-website-e8be2.firebaseapp.com",
    projectId: "blogs-website-e8be2",
    storageBucket: "blogs-website-e8be2.appspot.com",
    messagingSenderId: "709405793263",
    appId: "1:709405793263:web:0a438544faee55eac4f41a"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()