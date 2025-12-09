function showUploadFailedPopup() {
  const popup = document.getElementById('uploadFailedPopup');
  if (popup) {
    popup.classList.add('active');
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
  }
}

// Function to close the popup
function closeUploadFailedPopup() {
  const popup = document.getElementById('uploadFailedPopup');
  if (popup) {
    popup.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = '';
  }
}

// Function to retry upload
function retryUpload() {
  closeUploadFailedPopup();
  
  // Reset the file input and UI
  const imgInput = document.getElementById('upload');
  const imgPreview = document.getElementById('preview');
  const fileBar = document.getElementById('filewrapper');
  const uploadArea = document.querySelector('.upload-area');
  const errorMessage = document.getElementById('error-message');
  const uploadLabel = document.getElementById('upload-label');
  
  // Reset the selected file
  if (typeof selectedFile !== 'undefined') {
    selectedFile = null;
  }
  
  // Reset UI elements
  if (imgInput) imgInput.value = '';
  if (imgPreview) imgPreview.style.display = 'none';
  if (fileBar) fileBar.style.display = 'none';
  if (uploadArea) uploadArea.style.display = 'flex';
  if (errorMessage) errorMessage.style.display = 'none';
  if (uploadLabel) uploadLabel.style.borderColor = 'black';
  
  console.log('Ready to retry upload');
}

// Close popup when clicking outside the container
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('uploadFailedPopup');
  
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        closeUploadFailedPopup();
      }
    });
  }
});