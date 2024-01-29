// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
  apiKey: 'AIzaSyBjHtA7tDEBya3N0RwMN5gvJjoIMVE1JO0',
  projectId: 'fir-60338',
  messagingSenderId: '88850966122',
  appId: '1:88850966122:web:90dba5fed6614632688c13',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', function (event) {
  console.log('notificationclick', event)

  event.notification.close()
  event.waitUntil(self.clients.openWindow('https://about.rahulkhimsuriya.xyz/'))
})
