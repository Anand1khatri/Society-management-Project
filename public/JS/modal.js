// In public/js/modal.js
window.onload = function() {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'block';
  
      const closeBtn = document.getElementsByClassName('close-btn')[0];
      closeBtn.onclick = function() {
        errorModal.style.display = 'none';
      };
  
      window.onclick = function(event) {
        if (event.target == errorModal) {
          errorModal.style.display = 'none';
        }
      };
    }
  };
  