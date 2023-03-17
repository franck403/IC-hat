import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
    getDatabase,
    set,
    ref,
    push,
    child,
    onValue,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";


var user = localStorage.getItem("uid")

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${user}`)).then((snapshot) => {
  if (snapshot.exists()) {
    var username = snapshot.val().full_name
    var email = snapshot.val().email
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

localStorage.setItem("name",username)
localStorage.setItem("email",email)


window.location.replace("https://splendorous-hamster-ecd34b.netlify.app/");