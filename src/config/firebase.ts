// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAzGvHlTgdUS8PeGY1ND-YpUUYCrN0uWuk',
  authDomain: 'likey-app-78e14.firebaseapp.com',
  projectId: 'likey-app-78e14',
  storageBucket: 'likey-app-78e14.appspot.com',
  messagingSenderId: '813335191567',
  appId: '1:813335191567:web:2784e7271465e1706e837a',
  measurementId: 'G-2FC1LYQG4N',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const db = getFirestore(app)
