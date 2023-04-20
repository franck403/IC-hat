import { 
  hideLoginError, 
  showLoginState,
  showLoginError, 
  btnLogin,
  btnSignup
} from './ui.js'
import {setCookie,login,register} from './bhuy3huygyufwyuge.js';
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value
  const loginPassword = txtPassword.value
  try {
    login(loginEmail, loginPassword)
    showLoginState()
  } catch {}
}
const createAccount = async () => {
  const email = txtEmail.value
  const password = txtPassword.value

  try {
    register(loginEmail, loginPassword)
    showLoginState()
  }
  catch(error) {} 
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