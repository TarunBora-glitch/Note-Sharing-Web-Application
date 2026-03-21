document.addEventListener("DOMContentLoaded", function() {
  const deleteLinks = document.querySelectorAll('.note a');
  deleteLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          if (!confirm("Are you sure to delete this note?")) e.preventDefault();
      });
  });
});