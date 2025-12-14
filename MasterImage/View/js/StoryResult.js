document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const userPhoto = document.getElementById('userPhoto');
    const userName = document.getElementById('userName'); // If you want to change the name later
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const watermark = document.querySelector('.watermark');

    // --- 1. Get the Filename from URL ---
    // The previous page redirected here with ?image=filename.jpg
    const params = new URLSearchParams(window.location.search);
    const filename = params.get('image');

    // --- 2. Update the Image ---
    if (filename) {
        console.log("Loading image:", filename);
        
        // Construct the path relative to this HTML file.
        // HTML is in /html/, Images are in /assets/uploads/
        // So we go up one level (..) then into assets/uploads
        userPhoto.src = `../assets/uploads/${filename}`;

        // Optional: Hide the "Image Placeholder" text since we have a real photo
        if (watermark) {
            watermark.style.display = 'none';
        }
    } else {
        console.error("No image filename found in URL parameters.");
        // Optional: Show an error or keep the placeholder
        userPhoto.alt = "Error: Image not found";
    }

    // --- 3. Button Functionality ---
    
    // "No" Button - Go back to the start
    noBtn.addEventListener('click', () => {
        // Redirect to the homepage (Index.html)
        window.location.href = "/";
    });

    // "Yes" Button - Logic for saving
    yesBtn.addEventListener('click', () => {
        // You can add logic here to print, save to DB, or just finish the flow
        console.log("User accepted the photo.");
        alert("Photo Saved! (Placeholder action)");
        
        // Perhaps redirect to a "Thank You" page?
        // window.location.href = "/html/ThankYou.html";
    });
});