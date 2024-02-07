import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// Initialize Firebase (use your own config)
const firebaseConfig = {
  apiKey: "AIzaSyDq5HRXaxIfsoWxiNbkAN0Zb409m2NHU-k",
  authDomain: "gymw-c97a4.firebaseapp.com",
  projectId: "gymw-c97a4",
  storageBucket: "gymw-c97a4.appspot.com",
  messagingSenderId: "905248809906",
  appId: "1:905248809906:web:95278663ecb387344dbaab",
  measurementId: "G-VQNVRT930G",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

// Display emails on the dashboard
const emailsList = document.getElementById("emailsList");

function displayEmails(emails) {
  emailsList.innerHTML = "";
  emails.forEach((email) => {
    const row = document.createElement("tr");
    const emailCell = document.createElement("td");
    emailCell.textContent = email;
    row.appendChild(emailCell);
    emailsList.appendChild(row);
  });
}

// Fetch and display emails
const emailsRef = collection(firestore, "Emails");

try {
  const querySnapshot = await getDocs(emailsRef);
  const emails = [];

  querySnapshot.forEach((doc) => {
    const email = doc.data().email;
    console.log("Email found:", email);
    emails.push(email);
  });

  // Additional actions with the found emails data
  displayEmails(emails);
} catch (error) {
  console.error("Error fetching emails:", error);
}

// Add new offer
const addOfferForm = document.getElementById("addOfferForm");

addOfferForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const offerName = document.getElementById("offerName").value;
  const offerDescription = document.getElementById("offerDescription").value;
  const offerPrice = document.getElementById("offerPrice").value;

  const offersRef = collection(firestore, "Offers");

  try {
    addDoc(offersRef, {
      Name: offerName,
      Description: offerDescription,
      Price: parseFloat(offerPrice),
    });

    console.log("Offer added successfully");
    // Add any additional actions after adding an offer
  } catch (error) {
    console.error("Error adding offer:", error);
  }
});
