// Get all dropdown buttons
const dropdownButtons = document.querySelectorAll('.dropdown-btn');

// Add click event listener to each button
dropdownButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Toggle the active class on the parent list item
    this.parentElement.classList.toggle('active');
  });
});
