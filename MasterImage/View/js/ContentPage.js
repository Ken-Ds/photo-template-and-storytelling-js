document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Get the language from the URL (Query Parameter)
    const params = new URLSearchParams(window.location.search);
    let currentLanguage = params.get('lang');

    // Fallback: If URL is empty, try localStorage, or default to english
    if (!currentLanguage) {
        currentLanguage = localStorage.getItem('selectedLanguage') || 'english';
    }

    console.log("Loading content for:", currentLanguage);

    // 2. Get the containers
    const englishDiv = document.getElementById('english-container');
    const bontokDiv = document.getElementById('bontok-container');

    // 3. Logic to show/hide based on language
    if (currentLanguage === 'bontok') {
        // Show Bontok, Hide English
        bontokDiv.classList.add('visible');
        englishDiv.classList.remove('visible');
    } else {
        // Default to English
        englishDiv.classList.add('visible');
        bontokDiv.classList.remove('visible');
    }
});