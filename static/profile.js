// Toggle overlay
function toggleEdit() {
  const overlay = document.getElementById('editOverlay');
  overlay.classList.toggle('active');
}

// Update profile even if fields are empty
document.getElementById('editForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const usernameInput = document.getElementById('editUsername');
  const genderSelect = document.getElementById('editGender');
  const bioTextarea = document.getElementById('editBio');
  const yearSelect = document.getElementById('editYear');

  // Update displayed username if input has value, else keep existing
  document.getElementById('displayUsername').textContent = usernameInput.value || usernameInput.placeholder;

  // Update gender
  const genderValue = genderSelect.value || genderSelect.options[genderSelect.selectedIndex].text;
  document.getElementById('displayGender').textContent = genderValue;

  // Update bio
  document.getElementById('displayBio').textContent = bioTextarea.value || bioTextarea.placeholder;

  // Update year
  const yearValue = yearSelect.value || yearSelect.options[yearSelect.selectedIndex].text;
  document.getElementById('displayYear').textContent = yearValue;

  toggleEdit();
  alert('Profile updated successfully!');
});

// Load placeholders and default selects
function loadCurrentValues() {
  const username = document.getElementById('displayUsername').textContent;
  const gender = document.getElementById('displayGender').textContent;
  const bio = document.getElementById('displayBio').textContent;
  const year = document.getElementById('displayYear').textContent;

  const usernameInput = document.getElementById('editUsername');
  const genderSelect = document.getElementById('editGender');
  const bioTextarea = document.getElementById('editBio');
  const yearSelect = document.getElementById('editYear');

  usernameInput.value = "";
  usernameInput.placeholder = username;

  bioTextarea.value = "";
  bioTextarea.placeholder = bio || "Write something about yourself...";
  bioTextarea.style.height = 'auto';
  bioTextarea.style.height = bioTextarea.scrollHeight + 'px';

  // Reset selects
  Array.from(genderSelect.options).forEach(opt => {
      opt.selected = (opt.text === gender);
  });
  Array.from(yearSelect.options).forEach(opt => {
      opt.selected = (opt.text === year);
  });
}

document.querySelector('.edit-profile-btn').addEventListener('click', loadCurrentValues);