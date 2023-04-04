import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup
} from './ui.js'

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
 ;
  // Login using email/password
  const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value
  
    // step 1: try doing this w/o error handling, and then add try/catch
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  
    // step 2: add error handling
    // try {
    //   await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    // }
    // catch(error) {
    //   console.log(`There was an error: ${error}`)
    //   showLoginError(error)
    // }
  }
  
  // Create new account using email/password
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
  
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    }
    catch(error) {
      console.log(`There was an error: ${error}`)
      showLoginError(error)
    } 
  }
  
  // Monitor auth state
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
        lblAuthState.innerHTML = `You're not logged in.`
      }
    })
  }
  
  // Log out
  const logout = async () => {
    await signOut(auth);
  }
  
  btnLogin.addEventListener("click", loginEmailPassword) 
  btnSignup.addEventListener("click", createAccount)
  
  const auth = getAuth(firebaseApp);
  
  monitorAuthState();