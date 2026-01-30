<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js"></script>

<script>
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

async function enableNotification() {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return alert("Permission denied");

  const reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  messaging.useServiceWorker(reg);

  const token = await messaging.getToken({
    vapidKey: "YOUR_VAPID_KEY"
  });

  console.log("FCM Token:", token);

  fetch("https://YOUR-WORKER.workers.dev/save-token", {
    method: "POST",
    body: JSON.stringify({ token })
  });

  alert("Notification Enabled ✅");
}
</script>
