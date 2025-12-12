const timerDisplay = document.getElementById('timer-display');
const modal = document.getElementById('timeout-modal');
const popupDisplay = document.getElementById('popup-countdown');

document.addEventListener('DOMContentLoaded', function() {
            
    // Get the container
    var qrContainer = document.getElementById("img-qr-code");

    // Link 
    var urlToEncode = "http://192.168.68.143:3000/html/mobile.html";

    // Generate the QR Code
    new QRCode(qrContainer, {
        text: urlToEncode,
        width: 380,
        height: 380,
        colorDark : "#000000",
        colorLight : "transparent",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Timer
    let mainTimeLeft = 30;
    let popupTimeLeft = 3;
    

    // Format time as 00:XX
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
                
        const popupTimerInterval = setInterval(() => {
            popupTimeLeft--;
            popupDisplay.textContent =formatTime(popupTimeLeft);

            if (popupTimeLeft <= 0) {
                clearInterval(popupTimerInterval);
                        
                window.location.href = "Index.html"; 
            }
        }, 1000);
    }
});