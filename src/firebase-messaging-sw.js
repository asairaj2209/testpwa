importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCQTnVHlYT-OGioiKjPDYRfb7fhby2jT7s",
    authDomain: "pwa-push-notification-a6739.firebaseapp.com",
    projectId: "pwa-push-notification-a6739",
    storageBucket: "pwa-push-notification-a6739.appspot.com",
    messagingSenderId: "873035392244",
    appId: "1:873035392244:web:22edcbab33a47dc438aaa1",
    measurementId: "G-0Y95D8J14X"
});

const messaging = firebase.messaging();