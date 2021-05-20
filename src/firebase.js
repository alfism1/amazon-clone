import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDslQkM14SzKRRDdYa7xiYjTbr9thmoD64",
  authDomain: "challenge-c05bd.firebaseapp.com",
  projectId: "challenge-c05bd",
  storageBucket: "challenge-c05bd.appspot.com",
  messagingSenderId: "67317081689",
  appId: "1:67317081689:web:a75c8bef8cdc62a1ba7348",
  measurementId: "G-DXPS4V4LSQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
