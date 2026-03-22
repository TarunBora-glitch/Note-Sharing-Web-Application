// ================= STEP VARIABLES =================
let selectedYear = "";
let selectedSemester = "";
let selectedSubject = "";

// ================= DATA (ALL SUBJECTS) =================
const subjectsData = {
    "Year 1": {
        "Semester 1": [
            { code: "BS201", name: "Chemistry" },
            { code: "BS102", name: "Mathematics-I" },
            { code: "BS203", name: "Biology for Engineers" },
            { code: "ES201", name: "Programming for Problem Solving" },
            { code: "ES202", name: "Engineering Mechanics" }
        ],
        "Semester 2": [
            { code: "BS101", name: "Physics" },
            { code: "BS202", name: "Mathematics-II" },
            { code: "ES101", name: "Basic Electrical Engineering" },
            { code: "ES102", name: "Engineering Graphics" },
            { code: "ES104", name: "Design Thinking" }
        ]
    },

    "Year 2": {
        "Semester 3": [
            { code: "CS241301", name: "Data Structures & Algorithms" },
            { code: "CS241302", name: "Object Oriented Programming" },
            { code: "CS241303", name: "Software Engineering" },
            { code: "CS241304", name: "Digital Systems" },
            { code: "MA241305D", name: "Mathematics III" },
            { code: "HS241306", name: "Indian Knowledge Systems" }
        ],
        "Semester 4": [
            { code: "CS241401", name: "Database Management System" },
            { code: "CS241402", name: "Full Stack Development" },
            { code: "CS241403", name: "Machine Learning" },
            { code: "CS241404", name: "Computer Organization" },
            { code: "CS241405", name: "Design & Analysis of Algorithms" },
            { code: "HS241406", name: "Finance & Accounting" }
        ]
    },

    "Year 3": {
        "Semester 5": [
            { code: "CSE181501", name: "Database Management System" },
            { code: "CSE181502", name: "Design & Analysis of Algorithm" },
            { code: "CSE181503", name: "Formal Language & Automata" },
            { code: "CSE1815PE14", name: "Computer Graphics" },
            { code: "HS181506", name: "Engineering Economics" }
        ],
        "Semester 6": [
            { code: "CSE181601", name: "Compiler Design" },
            { code: "CSE181602", name: "Computer Networks" },
            { code: "CSE1816PE21", name: "Data Mining" },
            { code: "CSE1816PE31", name: "Image Processing" },
            { code: "CSE1816OE11", name: "Software Engineering" },
            { code: "HS181606", name: "Accountancy" }
        ]
    },

    "Year 4": {
        "Semester 7": [
            { code: "HS181704", name: "Principles of Management" },
            { code: "CSE1817PE41", name: "Cloud Computing" },
            { code: "CSE1817OE21", name: "Machine Learning" },
            { code: "CSE1817OE33", name: "Embedded Systems" }
        ],
        "Semester 8": [
            { code: "CSE1818PE51", name: "Cryptography & Network Security" },
            { code: "CSE1818PE63", name: "Neural Networks & Deep Learning" },
            { code: "CSE1818OE41", name: "Artificial Intelligence" },
            { code: "CSE1818OE54", name: "Soft Computing" }
        ]
    }
};

// ================= ELEMENTS =================
const yearBtns = document.querySelectorAll(".year-btn");

// ================= STEP 1 → YEAR =================
yearBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        yearBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        selectedYear = btn.textContent;
        document.getElementById("yearInput").value = selectedYear;
        document.getElementById("selected-year-title").textContent = selectedYear;

        const semesterContainer = document.querySelector(".semester-buttons");
        semesterContainer.innerHTML = "";

        const semesters = Object.keys(subjectsData[selectedYear]);

        semesters.forEach(sem => {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("semester-btn");
            button.textContent = sem;

            button.addEventListener("click", () => {

                document.querySelectorAll(".semester-btn").forEach(b => b.classList.remove("active"));
                button.classList.add("active");

                selectedSemester = sem;
                document.getElementById("semesterInput").value = selectedSemester;
                document.getElementById("selected-semester-title").textContent = selectedSemester;

                loadSubjects(selectedYear, selectedSemester);

                changeStep("upload-semester-step", "upload-subject-step");
            });

            semesterContainer.appendChild(button);
        });

        changeStep("upload-year-step", "upload-semester-step");
    });
});

// ================= LOAD SUBJECTS =================
function loadSubjects(year, semester) {
    const subjectGrid = document.querySelector(".subject-grid");
    subjectGrid.innerHTML = "";

    const subjects = subjectsData[year][semester];

    subjects.forEach(sub => {
        const card = document.createElement("div");
        card.classList.add("subject-card");

        card.innerHTML = `
            <h3>${sub.code}</h3>
            <p>${sub.name}</p>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".subject-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            selectedSubject = sub.code + " - " + sub.name;
            document.getElementById("subjectInput").value = selectedSubject;

            document.getElementById("selected-subject-title").textContent = sub.name;

            changeStep("upload-subject-step", "upload-files-step");
        });

        subjectGrid.appendChild(card);
    });
}

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