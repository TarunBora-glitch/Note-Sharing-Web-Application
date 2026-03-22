function togglePassword(id, icon) {
  const input = document.getElementById(id);

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
const flash = document.getElementById("flash-message");

if (flash) {
    setTimeout(() => {
        flash.style.opacity = "0";
        flash.style.transition = "0.5s";

        setTimeout(() => {
            flash.remove();
        }, 500);

    }, 3000); // hides after 3 seconds
}