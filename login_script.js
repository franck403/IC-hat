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