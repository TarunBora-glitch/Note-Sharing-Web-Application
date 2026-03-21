// STEP VARIABLES
let selectedYear = "";
let selectedSemester = "";
let selectedSubject = "";

// ELEMENTS
const yearBtns = document.querySelectorAll(".year-btn");
const semesterBtns = document.querySelectorAll(".semester-btn");
const subjectCards = document.querySelectorAll(".subject-card");

// STEP 1 → YEAR
yearBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedYear = btn.textContent;
        document.getElementById("yearInput").value = selectedYear;

        document.getElementById("selected-year-title").textContent = selectedYear;

        changeStep("upload-year-step", "upload-semester-step");
    });
});

// STEP 2 → SEMESTER
semesterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedSemester = btn.textContent;
        document.getElementById("semesterInput").value = selectedSemester;

        document.getElementById("selected-semester-title").textContent = selectedSemester;

        changeStep("upload-semester-step", "upload-subject-step");
    });
});

// STEP 3 → SUBJECT
subjectCards.forEach(card => {
    card.addEventListener("click", () => {
        selectedSubject = card.querySelector("h3").textContent;
        document.getElementById("subjectInput").value = selectedSubject;

        document.getElementById("selected-subject-title").textContent = selectedSubject;

        changeStep("upload-subject-step", "upload-files-step");
    });
});

// CHANGE STEP FUNCTION
function changeStep(current, next) {
    document.getElementById(current).classList.remove("active");
    document.getElementById(next).classList.add("active");
}

// BACK BUTTON
function goBack(stepId) {
    document.querySelectorAll(".upload-step").forEach(step => step.classList.remove("active"));
    document.getElementById(stepId).classList.add("active");
}

// FILE HANDLING
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

fileInput.addEventListener("change", () => {
    fileList.innerHTML = "";

    Array.from(fileInput.files).forEach(file => {
        const div = document.createElement("div");
        div.textContent = file.name;
        fileList.appendChild(div);
    });
});

// DRAG & DROP
const dragArea = document.getElementById("drag-area");

dragArea.addEventListener("click", () => fileInput.click());

dragArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragArea.style.background = "#e0f2fe";
});

dragArea.addEventListener("dragleave", () => {
    dragArea.style.background = "";
});

dragArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;

    const event = new Event("change");
    fileInput.dispatchEvent(event);
});