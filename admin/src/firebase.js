import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxOs4fCXv6yOUtK4VI7j4zjLcPgIE1W3U",
  authDomain: "netflix-project-bd809.firebaseapp.com",
  projectId: "netflix-project-bd809",
  storageBucket: "netflix-project-bd809.appspot.com",
  messagingSenderId: "542182876553",
  appId: "1:542182876553:web:3ef6399224f4fa2689ad58",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
