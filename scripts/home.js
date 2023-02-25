"use strict";
// Chọn phần tử
const btnLogout = document.getElementById("btn-logout");
const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const message = document.getElementById("welcome-message");

// Kiểm tra đăng nhập hay chưa
function checkLogin() {
  if (currentUser.firstName) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    message.innerHTML = `Welcome ${currentUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

checkLogin();

// Sự kiện logout
btnLogout.addEventListener("click", function () {
  removeItem("CU");
  currentUser = "";
  checkLogin();
});
