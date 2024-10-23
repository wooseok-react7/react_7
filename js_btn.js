
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.querySelector('.login-modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const submitBtn = document.querySelector(".submit-btn");


loginBtn.addEventListener('click', function () {
    loginModal.style.display = 'block';
    overlay.style.display = 'block';
});


closeBtn.addEventListener('click', function () {
    loginModal.style.display = 'none';
    overlay.style.display = 'none';
});


overlay.addEventListener('click', function () {
    loginModal.style.display = 'none';
    overlay.style.display = 'none';
});

