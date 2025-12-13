// --------------------ABOUT SHOP (START)-----------------------------

document.addEventListener("DOMContentLoaded", () => {
    const shopBtn = document.querySelector("#selector-shop");
    const appBtn = document.querySelector("#selector-app");
    const developersBtn = document.querySelector("#selector-developers");
    const title = document.getElementById('about-title');
    const backBtn = document.getElementById('back-btn');

    if (shopBtn) {
        shopBtn.addEventListener("mouseover", () => {
            document.getElementById('shop-icon').src = "../assets/images/Shop-white.png"
        })

        shopBtn.addEventListener("mouseout", () => {
            document.getElementById('shop-icon').src = "../assets/images/Shop-black.png"
        })

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
        appBtn.addEventListener("mouseover", () => {
            document.getElementById('app-icon').src = "../assets/images/App-white.png"
        })

        appBtn.addEventListener("mouseout", () => {
            document.getElementById('app-icon').src = "../assets/images/App-black.png"
        })

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
        developersBtn.addEventListener("mouseover", () => {
            document.getElementById('developers-icon').src = "../assets/images/Developers-white.png"
        })

        developersBtn.addEventListener("mouseout", () => {
            document.getElementById('developers-icon').src = "../assets/images/Developers-black.png"
        })

        developersBtn.addEventListener("click", () =>{
            document.getElementById('selector-shop').style.display = 'none';
            document.getElementById('selector-app').style.display = 'none';
            document.getElementById('selector-developers').style.display = 'none';

            title.innerHTML = "ABOUT THE DEVELOPERS";
            title.style.display = 'flex';
            document.getElementById('about-developers').style.display = 'grid';
            backBtn.style.display = 'flex';
        })
    }

});