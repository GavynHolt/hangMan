import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "hangman-3fd19.firebaseapp.com",
  projectId: "hangman-3fd19",
  storageBucket: "hangman-3fd19.appspot.com",
  messagingSenderId: "578802410309",
  appId: "1:578802410309:web:6cc1e80594019bca1e542c",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
