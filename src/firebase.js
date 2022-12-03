import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDBiPqXXUfwbhbPkeWKLlspMwKVwouw4xw",
  authDomain: "newbeginnings-7fed9.firebaseapp.com",
  databaseURL: "https://newbeginnings-7fed9-default-rtdb.firebaseio.com",
  projectId: "newbeginnings-7fed9",
  storageBucket: "newbeginnings-7fed9.appspot.com",
  messagingSenderId: "134855099076",
  appId: "1:134855099076:web:2fa7a4da5e68149e9dff91",
  measurementId: "G-FVYZBPF2XJ"
};
/**
 * A singleton FirebaseApp instance to be shared across the application
 * @see initializeApp
 */
const firebase = initializeApp(firebaseConfig);

export { firebase }