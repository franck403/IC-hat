import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
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
  const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value
  
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  
  }
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await setCookie("uid","ready")
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user)
        showApp()
        showLoginState(user)
  
        hideLoginError()
        hideLinkError()
      }
      else {
        showLoginForm()
      }
    })
  }
  btnLogin.addEventListener("click", loginEmailPassword) 
  btnSignup.addEventListener("click", createAccount)
  
  const auth = getAuth(firebaseApp);
  
  monitorAuthState();