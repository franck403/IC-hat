import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    get,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
  authDomain: "ic-hat.firebaseapp.com",
  databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
  projectId: "ic-hat",
  storageBucket: "ic-hat.appspot.com",
  messagingSenderId: "720687529085",
  appId: "1:720687529085:web:2d964e880c5e2398058514",
  measurementId: "G-YC8K0D7GLR"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

var user = localStorage.getItem("uid")

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${user}`)).then((snapshot) => {
  if (snapshot.exists()) {
    var username = snapshot.val().full_name
    var email = snapshot.val().email
    localStorage.setItem("name",username)
    localStorage.setItem("email",email)
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});



window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/");