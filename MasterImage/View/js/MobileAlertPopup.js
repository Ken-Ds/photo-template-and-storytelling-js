// Auto-redirect after 10 seconds
document.addEventListener('DOMContentLoaded', function() {
    let countdown = 10;
    
    // Auto-redirect to previous page or home after 10 seconds
    const redirectTimer = setTimeout(function() {
        window.history.back(); // Goes back to previous page
    }, 5000);
    
    // Optional: Allow user to click anywhere to go back immediately
    document.addEventListener('click', function() {
        clearTimeout(redirectTimer);
        window.history.back();
    });
});