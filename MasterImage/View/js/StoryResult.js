const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const userPhoto = document.getElementById('userPhoto');
const userName = document.getElementById('userName');

// Load user photo and name from URL parameters or localStorage
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const photoUrl = urlParams.get('photo');
    const name = urlParams.get('name');
    
    // If photo URL is provided, display it
    if (photoUrl) {
        userPhoto.src = decodeURIComponent(photoUrl);
    } else {
        // Try to get from localStorage
        const savedPhoto = localStorage.getItem('userPhoto');
        if (savedPhoto) {
            userPhoto.src = savedPhoto;
        }
    }
    
    // If name is provided, display it
    if (name) {
        userName.textContent = decodeURIComponent(name);
    } else {
        // Try to get from localStorage
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            userName.textContent = savedName;
        }
    }
});

// No button - Don't save and go back or to home
noBtn.addEventListener('click', function() {
    console.log('User chose not to save the photo');
    
    // Clear any stored photo data
    localStorage.removeItem('userPhoto');
    localStorage.removeItem('userName');
    
    // Redirect to home page or previous page
    // window.location.href = 'Home.html';
    // OR go back:
    window.history.back();
});

// Yes button - Save the photo
yesBtn.addEventListener('click', function() {
    console.log('User chose to save the photo');
    
    // Here you would implement the actual save functionality
    // This could involve:
    // 1. Downloading the image
    // 2. Saving to a database
    // 3. Sending to a server endpoint
    
    // Example: Download the image
    downloadPhoto();
    
    // Redirect to success page or home
    // window.location.href = 'SaveSuccess.html';
});

// Function to download the photo
function downloadPhoto() {
    const photoSrc = userPhoto.src;
    const photoName = userName.textContent.replace(/\s+/g, '_') + '_photo.jpg';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = photoSrc;
    link.download = photoName;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Photo download initiated');
}

// Alternative: Convert canvas/image to blob and download
// This is useful if you need to process the image first
function downloadPhotoAsBlob() {
    fetch(userPhoto.src)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = userName.textContent.replace(/\s+/g, '_') + '_photo.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading photo:', error);
            alert('Failed to download photo. Please try again.');
        });
}