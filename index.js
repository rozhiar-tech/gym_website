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
