"use strict";

// Chọn phần tử
const inputFName = document.getElementById("input-firstname");
const inputLName = document.getElementById("input-lastname");
const inputUName = document.getElementById("input-username");
const inputPass = document.getElementById("input-password");
const inputPassConfirm = document.getElementById("input-password-confirm");
const btnRegister = document.getElementById("btn-submit");

//Kiểm tra hợp lệ input
function validateData(data) {
  if (!data.firstName) {
    alert("Please input for first name!");
    inputFName.focus();
    return "";
  }
  if (!data.lastName) {
    alert("Please input for last name!");
    inputLName.focus();
    return "";
  }
  if (!data.userName) {
    alert("Please input for user name!");
    inputUName.focus();
    return "";
  }
  if (!data.password) {
    alert("Please input for password!");
    inputPass.focus();
    return "";
  }
  if (!inputPassConfirm.value) {
    alert("Please input for passwprd confirm!");
    inputPassConfirm.focus();
    return "";
  }
  if (checkUName(data.userName) > -1) {
    alert("User name must unique!");
    inputUName.focus();
    return "";
  }
  if (data.password.length < 8) {
    alert("Passwords must have at least 8 characters!");
    inputPass.focus();
    return "";
  }
  if (data.password !== inputPassConfirm.value) {
    alert("Password and confirm password does not match!");
    inputPassConfirm.focus();
    return "";
  }
  return true;
}

//Xóa input
function clearInput() {
  inputFName.value = "";
  inputLName.value = "";
  inputUName.value = "";
  inputPass.value = "";
  inputPassConfirm.value = "";
}

// Sự kiện nút đăng ký
btnRegister.addEventListener("click", function (e) {
  // Lấy dữ liệu
  const data = new User(
    inputFName.value,
    inputLName.value,
    inputUName.value,
    inputPass.value,
    5, // Đặt giá trị số bài hiển thị mặc định là 5
    "General" // Đặt giá trị thể loại mặc định là general
  );

  // Kiểm tra dữ liệu và lưu
  if (validateData(data)) {
    userArr.push(data);
    saveToStorage(KEY, userArr);
    alert("Success!...");
    window.location.href = "../pages/login.html";
  }
});
