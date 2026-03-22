// PASSWORD TOGGLE
function togglePassword(id, icon) {
  let input = document.getElementById(id);

  if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
  } else {
      input.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
  }
}

// ELEMENTS
let fullname = document.querySelector("input[placeholder='Full Name']");
let email = document.querySelector("input[placeholder='Email Address']");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let matchMsg = document.getElementById("matchMsg");
let form = document.querySelector(".signup-form");

// hide initially
matchMsg.style.display = "none";

// PASSWORD VALIDATION
function validatePassword() {
  let val = password.value;

  let length = document.getElementById("length");
  let caseCheck = document.getElementById("case");
  let number = document.getElementById("number");

  let isLength = val.length >= 6;
  let isCase = /[a-z]/.test(val) && /[A-Z]/.test(val);
  let isNumber = /[0-9]/.test(val);

  // LENGTH
  length.innerHTML = "At least 6 characters";
  length.style.color = isLength ? "green" : "red";

  // CASE
  caseCheck.innerHTML = "Uppercase and lowercase letters";
  caseCheck.style.color = isCase ? "green" : "red";

  // NUMBER
  number.innerHTML = "Numbers";
  number.style.color = isNumber ? "green" : "red";

  return isLength && isCase && isNumber;
}

// CONFIRM PASSWORD
function checkMatch() {
  if (confirmPassword.value.length === 0) {
      matchMsg.style.display = "none";
      return false;
  }

  if (confirmPassword.value !== password.value) {
      matchMsg.style.display = "block";
      matchMsg.innerHTML = "Passwords do not match";
      matchMsg.style.color = "red";
      return false;
  } else {
      matchMsg.style.display = "none";
      return true;
  }
}

// EMAIL VALIDATION
function validateEmail() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
}

// LIVE CHECK
function liveValidation() {
  validatePassword();
  checkMatch();
}

// EVENTS
fullname.addEventListener("input", liveValidation);
email.addEventListener("input", liveValidation);
password.addEventListener("input", liveValidation);
confirmPassword.addEventListener("input", liveValidation);

const flash = document.getElementById("flash-message");
if (flash) {
    setTimeout(() => {
        flash.style.opacity = "0";
        flash.style.transition = "0.5s";
        setTimeout(() => flash.remove(), 500);
    }, 3000);
}

// FINAL SUBMIT
form.addEventListener("submit", function(e) {

  let nameValid = fullname.value.trim() !== "";
  let emailValid = validateEmail();
  let passValid = validatePassword();
  let matchValid = checkMatch();

  if (!(nameValid && emailValid && passValid && matchValid)) {
      e.preventDefault();
      alert("Please fill all fields correctly before submitting.");
  }
});