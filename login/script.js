import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCYlPMPVxn-AUfMSNg6hQVkfX5tOtCIUMU',
  authDomain: 'ic-hat-v5.firebaseapp.com',
  databaseURL: 'https://ic-hat-v5-default-rtdb.firebaseio.com',
  projectId: 'ic-hat-v5',
  storageBucket: 'ic-hat-v5.firebasestorage.app',
  messagingSenderId: '247586562906',
  appId: '1:247586562906:web:1a8c683812e6fb3a63c963',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginEmailBtn = document.getElementById('login-email-btn');
const registerEmailBtn = document.getElementById('register-email-btn');
const loginGoogleBtn = document.getElementById('login-google-btn');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const userSection = document.getElementById('user-section');
const statusMessage = document.getElementById('status-message');
const feedbackMessage = document.getElementById('feedback-message');

// --- Gestion de la Langue ---

const getUILanguage = () => {
  const lang = (navigator.language || navigator.userLanguage).toLowerCase();
  return lang.startsWith('fr') ? 'fr' : 'en';
};

const LANG = getUILanguage();

const MESSAGES = {
  fr: {
    CONNECTED_AS: 'Connecté en tant que : ',
    PLEASE_LOGIN: 'Veuillez vous connecter.',
    REG_SUCCESS: 'Inscription réussie ! Vous êtes connecté.',
    REG_ALREADY_EXISTS: 'Ce compte existe déjà. Tentative de connexion...',
    LOGOUT_SUCCESS: 'Déconnexion réussie.',
    ERROR_LOGIN: 'Erreur de connexion : ',
    ERROR_REGISTER: "Erreur d'inscription : ",
    ERROR_LOGOUT: 'Erreur de déconnexion : ',
    ERROR_GOOGLE: 'Erreur de connexion Google : ',
  },
  en: {
    CONNECTED_AS: 'Connected as: ',
    PLEASE_LOGIN: 'Please log in.',
    REG_SUCCESS: 'Registration successful! You are logged in.',
    REG_ALREADY_EXISTS: 'This account already exists. Attempting login...',
    LOGOUT_SUCCESS: 'Logout successful.',
    ERROR_LOGIN: 'Login error: ',
    ERROR_REGISTER: 'Registration error: ',
    ERROR_LOGOUT: 'Logout error: ',
    ERROR_GOOGLE: 'Google login error: ',
  },
};

const TEXT = MESSAGES[LANG];

// --- Fonctions d'Interface ---

const createFeedbackMessage = (message, type) => {
  feedbackMessage.textContent = message;
  feedbackMessage.className = '';
  feedbackMessage.classList.add(type);
  feedbackMessage.style.display = 'block';
  setTimeout(() => {
    feedbackMessage.style.display = 'none';
  }, 5000);
};

const updateUI = (user) => {
  if (user) {
    authSection.classList.add('hidden');
    userSection.classList.remove('hidden');
    statusMessage.textContent =
      TEXT.CONNECTED_AS + (user.email || user.displayName);
    feedbackMessage.style.display = 'none';
  } else {
    authSection.classList.remove('hidden');
    userSection.classList.add('hidden');
    statusMessage.textContent = TEXT.PLEASE_LOGIN;
  }

  // Logique de redirection basée sur l'état et l'URL actuelle
  const currentPath = window.location.pathname;

  if (user && currentPath !== '/chat') {
    window.location.replace('/chat/');
  } else if (!user && currentPath === '/chat') {
    window.location.href = '/';
  }
};

// --- Fonctions d'Authentification ---

const loginEmailPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    createFeedbackMessage(TEXT.ERROR_LOGIN + error.message, 'error');
    return false;
  }
};

const registerEmailPassword = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // La redirection sera gérée par onAuthStateChanged
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      createFeedbackMessage(TEXT.REG_ALREADY_EXISTS, 'success');
      // Tente de connecter l'utilisateur existant
      await loginEmailPassword(email, password);
    } else {
      createFeedbackMessage(TEXT.ERROR_REGISTER + error.message, 'error');
    }
  }
};

const loginGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      createFeedbackMessage(TEXT.ERROR_GOOGLE + error.message, 'error');
    }
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    createFeedbackMessage(TEXT.LOGOUT_SUCCESS, 'success');
  } catch (error) {
    createFeedbackMessage(TEXT.ERROR_LOGOUT + error.message, 'error');
  }
};

// --- Événements et Initialisation ---

loginEmailBtn.addEventListener('click', () =>
  loginEmailPassword(emailInput.value, passwordInput.value)
);
registerEmailBtn.addEventListener('click', registerEmailPassword);
loginGoogleBtn.addEventListener('click', loginGoogle);
logoutBtn.addEventListener('click', logout);

onAuthStateChanged(auth, (user) => {
  updateUI(user);
});
