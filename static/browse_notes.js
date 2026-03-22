// ================= GLOBAL STATE =================
let currentStep = 'years';
let currentYear = "";
let currentSemester = "";
let currentSubject = "";

// ================= SUBJECT DATA =================
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

// ================= YEAR CLICK =================
document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', function () {

        document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        currentYear = `Year ${this.dataset.year}`;
        document.getElementById('year-title').textContent = currentYear;

        generateSemesters(currentYear);
        showStep('semesters');
    });
});

// ================= GENERATE SEMESTERS =================
function generateSemesters(year) {
    const container = document.getElementById('semester-buttons');
    container.innerHTML = "";

    const semesters = Object.keys(subjectsData[year]);

    semesters.forEach(sem => {
        const btn = document.createElement('button');
        btn.className = 'sem-btn';
        btn.textContent = sem;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentSemester = sem;
            document.getElementById('sem-title').textContent = `${year} - ${sem}`;

            loadSubjects(year, sem);
            showStep('subjects');
        });

        container.appendChild(btn);
    });
}

// ================= LOAD SUBJECTS =================
function loadSubjects(year, semester) {
    const grid = document.querySelector('.subject-grid');
    grid.innerHTML = "";

    const subjects = subjectsData[year][semester];

    subjects.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'subject-card';

        card.innerHTML = `
            <h3>${sub.code}</h3>
            <p>${sub.name}</p>
        `;

        card.addEventListener('click', () => {
            document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            currentSubject = `${sub.code} - ${sub.name}`;
            document.getElementById('subject-title').textContent = currentSubject;

            showStep('notes');
        });

        grid.appendChild(card);
    });
}

// ================= STEP CONTROL =================
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(step + '-step').classList.add('active');
    currentStep = step;
}

function goBack(step) {
    showStep(step);
}