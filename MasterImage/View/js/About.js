// --------------------ABOUT SHOP (START)-----------------------------

document.addEventListener("DOMContentLoaded", () => {
    const shopBtn = document.querySelector("#selector-shop");
    const appBtn = document.querySelector("#selector-app");
    const developersBtn = document.querySelector("#selector-developers");
    const title = document.getElementById('about-title');
    const backBtn = document.getElementById('back-btn');

    if (shopBtn) {
        shopBtn.addEventListener("click", () => {
            document.getElementById('selector-shop').style.display = 'none';
            document.getElementById('selector-app').style.display = 'none';
            document.getElementById('selector-developers').style.display = 'none';

            title.innerHTML = "ABOUT SHOP";
            title.style.display = 'flex';
            document.getElementById('about-shop').style.display = 'grid';
            backBtn.style.display = 'flex';
        })
    }

    if (appBtn){
        appBtn.addEventListener("click", () =>{
            document.getElementById('selector-shop').style.display = 'none';
            document.getElementById('selector-app').style.display = 'none';
            document.getElementById('selector-developers').style.display = 'none';

            title.innerHTML = "ABOUT THE APP";
            title.style.display = 'flex';
            document.getElementById('about-app').style.display = 'grid';
            backBtn.style.display = 'flex';
        })
    }

    if (developersBtn) {
        developersBtn.addEventListener("click", () =>{
            document.getElementById('selector-shop').style.display = 'none';
            document.getElementById('selector-app').style.display = 'none';
            document.getElementById('selector-developers').style.display = 'none';

            title.innerHTML = "ABOUT THE DEVELOPERS";
            title.style.display = 'flex';
            document.getElementById('about-developers').style.display = 'grid';
            backBtn.style.display = 'flex';

            // let slideIndex = 1;
            // showSlides(slideIndex);

            // // Next/previous controls
            // function plusSlides(n) {
            // showSlides(slideIndex += n);
            // }

            // // Thumbnail image controls
            // function currentSlide(n) {
            // showSlides(slideIndex = n);
            // }

            // function showSlides(n) {
            // let i;
            // let slides = document.getElementsByClassName("developer");
            // let dots = document.getElementsByClassName("dot");
            // if (n > slides.length) {slideIndex = 1}
            // if (n < 1) {slideIndex = slides.length}
            // for (i = 0; i < slides.length; i++) {
            //     slides[i].style.display = "none";
            // }
            // for (i = 0; i < dots.length; i++) {
            //     dots[i].className = dots[i].className.replace(" active", "");
            // }
            // slides[slideIndex-1].style.display = "block";
            // dots[slideIndex-1].className += " active";
            // }
        })
    }

});