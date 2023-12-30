import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js'

import { getAuth,signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js'
import { getFirestore,collection, query, where, getDocs,addDoc } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
// import Toastify from 'toastify-js' 

// Your Firebase configuration
const firebaseConfig = {
  // Your Firebase config details here...
  apiKey: "AIzaSyDq5HRXaxIfsoWxiNbkAN0Zb409m2NHU-k",
  authDomain: "gymw-c97a4.firebaseapp.com",
  projectId: "gymw-c97a4",
  storageBucket: "gymw-c97a4.appspot.com",
  messagingSenderId: "905248809906",
  appId: "1:905248809906:web:95278663ecb387344dbaab",
  measurementId: "G-VQNVRT930G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)



// JavaScript to toggle the contact dialog
const contactBtn = document.querySelector(".contact-btn");
const contactDialog = document.getElementById("contactDialog");
const closeBtn = document.querySelector(".close");

contactBtn.addEventListener("click", () => {
  contactDialog.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  contactDialog.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === contactDialog) {
    contactDialog.style.display = "none";
  }
});
// JavaScript to toggle the login form
const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");

loginButton.addEventListener("click", () => {
  loginForm.style.display = "block"; // Show the login form when the button is clicked
  loginForm.style.zIndex="2";
});



// Handling form submission
const userLoginForm = document.getElementById("userLoginForm");

userLoginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  // Firebase login logic
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful login - you can access the user info here
      const user = userCredential.user;
      console.log("Logged in:", user);
      // Add your actions after successful login here
      window.location.href = "dashboard.html";

    })
    .catch((error) => {
      // Handle login errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
    });
  // For demonstration, let's hide the login form after submission
  loginForm.style.display = "none";
});


// Function to create a small window to display offer details
// Function to create a small window to display offer details
function displayOfferDetails(offerData) {
  // Create a div element for the offer details
  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('offer-details'); // Apply styles as needed

  // Create elements to display offer details (modify as per your data structure)
  const nameElement = document.createElement('p');
  nameElement.textContent = `Name: ${offerData.Name}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${offerData.Description}`;
  const price = document.createElement('p');
  price.textContent=`Price: ${offerData.Price} $`;

  // Add the elements to the container
  detailsContainer.appendChild(nameElement);
  detailsContainer.appendChild(descriptionElement);
  detailsContainer.appendChild(price);

  // Add the details container to the body or a specific element
  document.body.appendChild(detailsContainer); // Change to a different parent element if needed

  // Center the details container in the middle of the screen
  detailsContainer.style.position = 'fixed';
  detailsContainer.style.top = '50%';
  detailsContainer.style.left = '50%';
  detailsContainer.style.transform = 'translate(-50%, -50%)';
  detailsContainer.style.background = '#fff'; // Set background color
  // detailsContainer.style.padding = '20px'; // Add padding for content

  // Set dimensions and other styles for the container
  detailsContainer.style.width = '300px'; // Set width
  detailsContainer.style.height = '196px'; // Set height
  detailsContainer.style.border = '2px solid #ccc'; // Add border
  detailsContainer.style.borderRadius = '8px'; // Add border radius
}

// Rest of your code remains unchanged...

// Function to perform search
const offersRef = collection(firestore, "Offers");

window.searchOffer = async function() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  
  const q = query(offersRef, where("Name", "==", searchTerm));

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const offerData = doc.data();
      console.log("Offer found:", offerData);
      displayOfferDetails(offerData); // Show offer details in a small window
      // Additional actions with the found offer data
    });
  } catch (error) {
    console.error("Error searching for offer:", error);
  }
};


const joinCommunityButton = document.getElementById("joinCommunityBtn");
const content1Div = document.querySelector(".content1");

joinCommunityButton.addEventListener("click", () => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("email-form"); // Apply styles as needed

  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("placeholder", "Enter your email");
  emailInput.classList.add("email-input"); // Add a class for styling if needed

  const submitButton = document.createElement("button");
  submitButton.textContent = "Join";
  submitButton.classList.add("custom-button2");
  submitButton.addEventListener("click", () => {
    const userEmail = emailInput.value.trim();
    if (userEmail !== "") {
      // Add the user's email to the Emails collection in Firestore
      const emailsRef = collection(firestore, "Emails");
      addDoc(emailsRef, { email: userEmail })
        .then(() => {
          console.log("Email added to Firestore:", userEmail);
          Toastify({
            text: "Congrajulation for joining our community ",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          formContainer.style.display = "none"; // Hide the form after submission
        })
        .catch((error) => {
          console.error("Error adding email to Firestore:", error);
        });
    }
  });

  formContainer.appendChild(emailInput);
  formContainer.appendChild(submitButton);

  // Append the form inside the content1 div
  content1Div.appendChild(formContainer);

  // Hide the button after showing the email form
  // joinCommunityButton.style.display = "none";
});
