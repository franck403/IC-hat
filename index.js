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
      await login(loginEmail, loginPassword)
      await showLoginState()
    } catch {}
  }
  const createAccount = async () => {
    const email = txtEmail.value
    const password = txtPassword.value
    const name = txtName.value
  
    try {
      await register(name,email, password)
      await showLoginState()
    }
    catch(error) {} 
  }
  const winhref = window.location.href
  const winl = winhref.split("#")
  if (winl[1] != "register") {
    btnLogin.addEventListener("click", loginEmailPassword) 
    btnSignup.remove()
    txtName.remove()
    txtNameNom.remove()
  } else {
    btnSignup.addEventListener("click", createAccount)
    btnLogin.remove()
  }