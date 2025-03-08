// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKIjdd0Z0BmGeA7gWd07MagUc6phH2of4",
  authDomain: "realtimevue-50d8e.firebaseapp.com",
  databaseURL: "https://realtimevue-50d8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realtimevue-50d8e",
  storageBucket: "realtimevue-50d8e.firebasestorage.app",
  messagingSenderId: "1053443093014",
  appId: "1:1053443093014:web:57d79f8148d14a7c343b37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function get_viewers_ip(json) {
  const viewers_ip = json.ip;
  // count view with ip
  count_view(viewers_ip);
}

function count_view(viewers_ip) {
  const ip_to_string = viewers_ip.replace(/\./g, "-");

  set(ref(database, "page_views/" + ip_to_string), {
    viewers_ip: viewers_ip,
  });
}

// Fetch the IP address using the ipify API
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => get_viewers_ip(data))
  .catch((error) => console.error("Error fetching IP address:", error));

// Update the view count in real-time
onValue(ref(database, "page_views"), (snapshot) => {
  let views = 0;
  snapshot.forEach(() => {
    views++;
  });
  try {
    const viewCountElement = document.getElementById("view_count_text");
    if (viewCountElement) {
      viewCountElement.innerHTML = views;
    }
  } catch (error) {
    // Silently catch the error without logging it
  }
});
