import firebase from 'firebase';
const firebaseApp = firebase.initializeApp(
    {
  apiKey: "AIzaSyBPRwy9R2sTUsoY1tkdaLERT_X7aMxGo-8",
  authDomain: "instagram-clone-349.firebaseapp.com",
  projectId: "instagram-clone-349",
  storageBucket: "instagram-clone-349.appspot.com",
  messagingSenderId: "849082552862",
  appId: "1:849082552862:web:6ae05ecc48aecab5dd540f",
  measurementId: "G-JCJQJJPRTQ"
    }
);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};