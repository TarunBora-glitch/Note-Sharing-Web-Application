const preview = document.getElementById("preview");
const fileInput = document.getElementById("fileInput");
const uploadText = document.getElementById("uploadText");

// Click image or text → open file picker
preview.addEventListener("click", () => fileInput.click());
uploadText.addEventListener("click", () => fileInput.click());

// Show selected image
fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = this.result;
        });

        reader.readAsDataURL(file);
    }
});