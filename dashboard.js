import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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
const auth = getAuth(app);

const firestore = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in.
    console.log("User is logged in:", user.uid);
  } else {
    // No user is signed in, redirect to the login page.
    window.location.href = "index.html"; // Replace with your login page URL
  }
});

const usersRef = collection(firestore, "Users");

try {
  const userSnapshot = await getDocs(
    query(usersRef, where("uid", "==", auth().currentUser.uid))
  );

  if (userSnapshot.size > 0) {
    const userData = userSnapshot.docs[0].data();
    if (userData.role === "admin") {
      // User is an admin, proceed with admin-related tasks
      console.log("User is an admin");
    } else {
      // User is not an admin, redirect or show an error
      console.error("User is not an admin");
      // Redirect or show an error message
    }
  } else {
    console.error("User not found in the Users collection");
  }
} catch (error) {
  console.error("Error checking user role:", error);
}

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

// Add this code after the "Add new offer" section in your JavaScript file

const createAdminForm = document.getElementById("createAdminForm");

createAdminForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input values for new admin
  const adminName = document.getElementById("adminName").value;
  const adminEmail = document.getElementById("adminEmail").value;
  const adminPassword = document.getElementById("adminPassword").value;

  const newAdminData = {
    name: adminName,
    email: adminEmail,
    role: "admin", // Assuming 'role' is a field to identify the user role
  };
  document.getElementById("adminName").value = "";
  document.getElementById("adminEmail").value = "";
  document.getElementById("adminPassword").value = "";
  try {
    // Create new admin user in Firebase Authentication
    const credential = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );

    // Add the new admin data to the Users collection
    await addDoc(usersRef, {
      uid: credential.user.uid,
      ...newAdminData,
    });

    console.log("New admin created successfully");
    // Add any additional actions after creating a new admin
  } catch (error) {
    console.error("Error creating new admin:", error);
  }
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    // Redirect or perform additional actions after logout
  } catch (error) {
    console.error("Error logging out:", error);
  }
});
