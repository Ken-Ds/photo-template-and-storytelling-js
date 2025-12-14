const timerDisplay = document.getElementById('timer-display');
const modal = document.getElementById('timeout-modal');
const popupDisplay = document.getElementById('popup-countdown');
const qrContainer = document.getElementById("img-qr-code"); // Get container outside for clarity

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Fetch IP Address and THEN Generate QR Code
    if (typeof injectedIP !== 'undefined' && injectedIP !== '127.0.0.1') {
        
        console.log("Local IP from Server:", injectedIP);
        
        // NOTE: This URL points back to THIS same page. 
        // If you have a separate mobile upload page, change "QRUpload.html" to that filename.
        const urlToEncode = "http://" + injectedIP + ":3000/html/Mobile.html";
        
        new QRCode(qrContainer, {
            text: urlToEncode,
            width: 380,
            height: 380,
            colorDark: "#000000",
            colorLight: "transparent",
            correctLevel: QRCode.CorrectLevel.H
        });
        console.log("QR Code generated for URL:", urlToEncode);

    } else {
        console.log('Unable to retrieve local IP address from server.');
        // This is safe to run even if qrContainer is empty
        if(qrContainer) qrContainer.innerHTML = "<p style='color:red'>Error: Network IP not found.</p>";
    }

    // 2. Timer Setup (The rest of your code is correct and can remain as is)
    let mainTimeLeft = 30;
    let popupTimeLeft = 3;

    const pollInterval = setInterval(() => {
    fetch('/check-status')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'found') {
                console.log("Upload detected:", data.filename);
                
                // 1. STOP the timer
                clearInterval(pollInterval);
                
                // 2. SAVE the filename to LocalStorage
                // This ensures SelectCaption.html can find it later!
                localStorage.setItem('uploadedFilename', data.filename);
                
                // 3. REDIRECT to the next page
                window.location.href = "/html/SelectTemplate.html"; 
            }
        })
        .catch(err => console.error("Polling error:", err));
}, 2000);
    function formatTime(seconds) {
        return (seconds < 10 ? "0" : "") + seconds;
    }

    const mainTimerInterval = setInterval(() => {
        mainTimeLeft--;
        timerDisplay.textContent = formatTime(mainTimeLeft);

        if (mainTimeLeft <= 0) {
            clearInterval(mainTimerInterval);
            showPopup();
        }
    }, 1000);

    function showPopup() {
        modal.style.display = "flex";
        popupDisplay.textContent = formatTime(popupTimeLeft); // Set initial popup time

        const popupTimerInterval = setInterval(() => {
            popupTimeLeft--;
            popupDisplay.textContent = formatTime(popupTimeLeft);

            if (popupTimeLeft <= 0) {
                clearInterval(popupTimerInterval);
                window.location.href = "/";
            }
        }, 1000);
    }
});