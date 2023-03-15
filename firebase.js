import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_7Ma8wrJMuFCnWgcHRbWmTarkIIlJAnM",
    authDomain: "next-todo-9a797.firebaseapp.com",
    projectId: "next-todo-9a797",
    storageBucket: "next-todo-9a797.appspot.com",
    messagingSenderId: "727634382568",
    appId: "1:727634382568:web:2d0ec5b6a8a74654bcc35d"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
