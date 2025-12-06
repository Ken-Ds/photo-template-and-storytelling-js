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

});