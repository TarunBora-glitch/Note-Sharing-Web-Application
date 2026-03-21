// ================= STEP VARIABLES =================
let selectedYear = "";
let selectedSemester = "";
let selectedSubject = "";

// ================= ELEMENTS =================
const yearBtns = document.querySelectorAll(".year-btn");
const subjectCards = document.querySelectorAll(".subject-card");

// ================= STEP 1 → YEAR =================
yearBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        // REMOVE ACTIVE FROM ALL
        yearBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        selectedYear = btn.textContent;
        document.getElementById("yearInput").value = selectedYear;

        document.getElementById("selected-year-title").textContent = selectedYear;

        // 🎯 DYNAMIC SEMESTERS
        const semesterContainer = document.querySelector(".semester-buttons");
        semesterContainer.innerHTML = "";

        let semesters = [];

        if (selectedYear === "Year 1") {
            semesters = ["Semester 1", "Semester 2"];
        } else if (selectedYear === "Year 2") {
            semesters = ["Semester 3", "Semester 4"];
        } else if (selectedYear === "Year 3") {
            semesters = ["Semester 5", "Semester 6"];
        } else if (selectedYear === "Year 4") {
            semesters = ["Semester 7", "Semester 8"];
        }

        // CREATE SEMESTER BUTTONS
        semesters.forEach(sem => {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("semester-btn");
            button.textContent = sem;

            button.addEventListener("click", () => {

                // REMOVE ACTIVE FROM ALL
                document.querySelectorAll(".semester-btn").forEach(b => b.classList.remove("active"));
                button.classList.add("active");

                selectedSemester = sem;
                document.getElementById("semesterInput").value = selectedSemester;

                document.getElementById("selected-semester-title").textContent = selectedSemester;

                changeStep("upload-semester-step", "upload-subject-step");
            });

            semesterContainer.appendChild(button);
        });

        changeStep("upload-year-step", "upload-semester-step");
    });
});

// ================= STEP 3 → SUBJECT =================
subjectCards.forEach(card => {
    card.addEventListener("click", () => {

        // REMOVE ACTIVE FROM ALL
        subjectCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        selectedSubject = card.querySelector("h3").textContent;
        document.getElementById("subjectInput").value = selectedSubject;

        document.getElementById("selected-subject-title").textContent = selectedSubject;

        changeStep("upload-subject-step", "upload-files-step");
    });
});

// ================= STEP CHANGE =================
function changeStep(current, next) {
    document.getElementById(current).classList.remove("active");
    document.getElementById(next).classList.add("active");
}

// ================= BACK BUTTON =================
function goBack(stepId) {
    document.querySelectorAll(".upload-step").forEach(step => step.classList.remove("active"));
    document.getElementById(stepId).classList.add("active");
}

// ================= FILE HANDLING =================
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

// ================= DRAG & DROP =================
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