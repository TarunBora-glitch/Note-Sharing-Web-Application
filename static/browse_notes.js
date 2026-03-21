let currentStep = 'years';
let currentYear = 1;

// Year button click - FIXED SEMESTER LOGIC
document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        currentYear = parseInt(this.getAttribute('data-year'));
        document.getElementById('year-title').textContent = `Year ${currentYear}`;
        
        // Generate correct semesters based on year
        generateSemesters(currentYear);
        showStep('semesters');
    });
});

// Generate semesters based on year (1:1-2, 2:3-4, 3:5-6, 4:7-8)
function generateSemesters(year) {
    const semContainer = document.getElementById('semester-buttons');
    semContainer.innerHTML = '';
    
    let semStart, semEnd;
    if (year === 1) { semStart = 1; semEnd = 2; }
    else if (year === 2) { semStart = 3; semEnd = 4; }
    else if (year === 3) { semStart = 5; semEnd = 6; }
    else if (year === 4) { semStart = 7; semEnd = 8; }
    
    for (let sem = semStart; sem <= semEnd; sem++) {
        const semBtn = document.createElement('button');
        semBtn.className = 'sem-btn';
        semBtn.setAttribute('data-step', 'subjects');
        semBtn.setAttribute('data-sem', sem);
        semBtn.textContent = `${sem}${getOrdinalSuffix(sem)} Sem`;
        semContainer.appendChild(semBtn);
    }
    
    // Add event listeners to new semester buttons
    document.querySelectorAll('.sem-btn').forEach(btn => {
        btn.addEventListener('click', handleSemesterClick);
    });
}

// Handle semester click
function handleSemesterClick() {
    document.querySelectorAll('.sem-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const sem = parseInt(this.getAttribute('data-sem'));
    document.getElementById('sem-title').textContent = `Year ${currentYear} - ${sem}${getOrdinalSuffix(sem)} Sem`;
    document.getElementById('subject-title').textContent = `${sem}${getOrdinalSuffix(sem)} Sem -`;
    
    showStep('subjects');
}

// Get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(num) {
    if (num === 1 || num === 21 || num === 31) return 'st';
    if (num === 2 || num === 22) return 'nd';
    if (num === 3 || num === 23) return 'rd';
    return 'th';
}

// Subject card click
document.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        const subjectName = this.querySelector('h3').textContent;
        const subjectDesc = this.querySelector('p').textContent;
        document.getElementById('subject-title').textContent = `${subjectName} - ${subjectDesc}`;
        
        showStep('notes');
    });
});

function showStep(step) {
    document.querySelectorAll('.step').forEach(s => {
        s.classList.remove('active');
    });
    document.getElementById(step + '-step').classList.add('active');
    currentStep = step;
}

function goBack(previousStep) {
    showStep(previousStep);
}