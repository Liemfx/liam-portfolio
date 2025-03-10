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

// Fetch the IP address using the ipify API
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    get_viewers_ip(data);
  })
  .catch((error) => console.error("Error fetching IP address:", error));

function get_viewers_ip(json) {
  const viewers_ip = json.ip;
  // Fetch additional information using the ipgeolocation.io API
  fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=33a97eb12e8b405c86573310c0e8363d&ip=${viewers_ip}`
  )
    .then((response) => response.json())
    .then((data) => {
      count_view(viewers_ip, data);
    })
    .catch((error) => console.error("Error fetching additional info:", error));
}

function count_view(viewers_ip, additionalInfo) {
  const ip_to_string = viewers_ip.replace(/\./g, "-");

  set(ref(database, "page_views/" + ip_to_string), {
    viewers_ip: viewers_ip,
    city: additionalInfo.city,
    region: additionalInfo.state_prov,
    country: additionalInfo.country_name,
    latitude: additionalInfo.latitude,
    longitude: additionalInfo.longitude,
    organization: additionalInfo.organization,
    time_zone: additionalInfo.time_zone.current_time,
  })
    .then(() => {
      // Data stored successfully
    })
    .catch((error) => {
      console.error("Error storing data to Firebase:", error);
    });
}

// Update the view count in real-time
onValue(ref(database, "page_views"), (snapshot) => {
  let views = 0;
  snapshot.forEach(() => {
    views++;
  });
  const viewCountElement = document.getElementById("view_count_text");
  if (viewCountElement) {
    viewCountElement.innerHTML = views;
  }
});
