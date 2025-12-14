
let selectedLanguage = 'english'; // Default language

// Get all language buttons
const langButtons = document.querySelectorAll('.lang-btn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

// Add click event to each language button
langButtons.forEach(button => {
    button.addEventListener('click', function() {
        langButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        selectedLanguage = this.getAttribute('data-lang');
        console.log('Selected language:', selectedLanguage);
        localStorage.setItem('selectedLanguage', selectedLanguage);
    });
});

// Back button functionality
backBtn.addEventListener('click', function() {
    window.history.back();
});

// Next button functionality
nextBtn.addEventListener('click', function() {
    // Save language
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Redirect to Caption Selection
    window.location.href = "SelectCaption.html";
});
// Load previously selected language from localStorage (if exists)
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    
    if (savedLanguage) {
        selectedLanguage = savedLanguage;
        
        // Update UI to reflect saved selection
        langButtons.forEach(button => {
            if (button.getAttribute('data-lang') === savedLanguage) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }
});