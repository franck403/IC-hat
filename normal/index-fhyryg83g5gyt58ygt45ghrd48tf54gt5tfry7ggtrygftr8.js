import { 
  hideLoginError, 
  showLoginState,
  showLoginError, 
  btnLogin,
  btnSignup
} from './ui.js'
import {setCookie} from './bhuy3huygyufwyuge.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { 
  getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js'
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

var firebaseApp =  initializeApp({
    apiKey: "AIzaSyD9po7l-vwO0VrY1rMYDFTYNlEBv54T6do",
    authDomain: "ic-hat.firebaseapp.com",
    databaseURL: "https://ic-hat-default-rtdb.firebaseio.com",
    projectId: "ic-hat",
    storageBucket: "ic-hat.appspot.com",
    messagingSenderId: "720687529085",
    appId: "1:720687529085:web:2d964e880c5e2398058514",
    measurementId: "G-YC8K0D7GLR"
});
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
const database = getDatabase(app);

  const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value
    try {
      setCookie("ready","ready")
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      setCookie("email",loginEmail)
      showLoginState()
    } catch {
      setCookie("ready",null)
    }
  }
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
  
    try {
      setCookie("ready","ready")
      await createUserWithEmailAndPassword(auth, email, password)
      showLoginState()
      setCookie("email",email)
    }
    catch(error) {
      setCookie("ready",null)
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }
  const winhref = window.location.href
  const winl = winhref.split("#")
  if (winl[1] != "register") {
    btnLogin.addEventListener("click", loginEmailPassword) 
    btnSignup.remove()
  } else {
    btnSignup.addEventListener("click", createAccount)
    btnLogin.remove()
  }
  
  const auth = getAuth(firebaseApp);