// --------------------USER AGREEMENT PART (START)-----------------------------

document.addEventListener("DOMContentLoaded", () => {
    const nextBtn = document.querySelector("#nextUA button");
    const backBtn = document.querySelector("#backUA button");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "../html/Index.html";
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            document.querySelector('.UserAgreement').style.display = 'none';
            document.getElementById('UA').style.display = 'none';
            document.querySelector('.content').style.display = 'flex';
            document.getElementById('title-tutorial').style.display = 'flex';
            document.getElementById('tutorial').style.display = 'block';
        });
    }
});

// --------------------USER AGREEMENT PART (END)-----------------------------
