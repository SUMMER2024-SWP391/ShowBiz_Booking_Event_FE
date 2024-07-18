import { getStorage } from 'firebase/storage'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// const {
//   FIREBASE_API_KEY,
//   FIRE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORERAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID,
//   FIREBASE_MEASUREMENT_ID
// } = import.meta.env

const firebaseConfig = {
  apiKey: 'AIzaSyAP3bTlTid8bGoKiSEsPeuzJluEBnIlF6k',
  authDomain: 'show-biz-event-backend.firebaseapp.com',
  projectId: 'show-biz-event-backend',
  storageBucket: 'show-biz-event-backend.appspot.com',
  messagingSenderId: '233507596428',
  appId: '1:233507596428:web:b0d32db2e0c2ef151bf3a9',
  measurementId: 'G-BR4EH19WZF'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const imageDB = getStorage(app)
