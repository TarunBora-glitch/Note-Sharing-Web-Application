const password = document.querySelector("input[name='password']");
const confirmPassword = document.querySelector("input[name='confirm_password']");

const lengthRule = document.getElementById("length");
const caseRule = document.getElementById("case");
const numberRule = document.getElementById("number");

password.addEventListener("input", () => {
    const val = password.value;

    // LENGTH
    if (val.length >= 6) {
        lengthRule.classList.add("valid");
        lengthRule.classList.remove("invalid");
    } else {
        lengthRule.classList.add("invalid");
        lengthRule.classList.remove("valid");
    }

    // CASE
    if (/[a-z]/.test(val) && /[A-Z]/.test(val)) {
        caseRule.classList.add("valid");
        caseRule.classList.remove("invalid");
    } else {
        caseRule.classList.add("invalid");
        caseRule.classList.remove("valid");
    }

    // NUMBER
    if (/[0-9]/.test(val)) {
        numberRule.classList.add("valid");
        numberRule.classList.remove("invalid");
    } else {
        numberRule.classList.add("invalid");
        numberRule.classList.remove("valid");
    }
});