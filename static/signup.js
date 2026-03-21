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
  length.innerHTML = (isLength ? "🟢" : "🔴") + " At least 6 characters";
  length.classList.toggle("valid", isLength);

  // CASE
  caseCheck.innerHTML = (isCase ? "🟢" : "🔴") + " Uppercase and lowercase letters";
  caseCheck.classList.toggle("valid", isCase);

  // NUMBER
  number.innerHTML = (isNumber ? "🟢" : "🔴") + " Numbers";
  number.classList.toggle("valid", isNumber);

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
      matchMsg.innerHTML = "🔴 Passwords do not match";
      matchMsg.classList.add("not-match");
      matchMsg.classList.remove("match");
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

// LIVE CHECK (no disabling now)
function liveValidation() {
  validatePassword();
  checkMatch();
}

// EVENT LISTENERS (live UI feedback only)
fullname.addEventListener("input", liveValidation);
email.addEventListener("input", liveValidation);
password.addEventListener("input", liveValidation);
confirmPassword.addEventListener("input", liveValidation);

// ✅ FINAL SUBMIT VALIDATION
form.addEventListener("submit", function(e) {

  let nameValid = fullname.value.trim() !== "";
  let emailValid = validateEmail();
  let passValid = validatePassword();
  let matchValid = checkMatch();

  if (!(nameValid && emailValid && passValid && matchValid)) {
      e.preventDefault(); // ❌ stop submit
      alert("Please fill all fields correctly before submitting.");
  }
});