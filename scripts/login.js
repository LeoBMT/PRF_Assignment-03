"use strict";

//Chọn phần tử
const inputUName = document.getElementById("input-username");
const inputPass = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// Kiểm tra hợp lệ input
function validateDataLogin(data) {
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
  if (checkUName(data.userName) === -1) {
    alert("User name is not available!");
    inputUName.focus();
    return "";
  }

  if (!checkPass(data.userName, data.password)) {
    alert("Passwords incorrect!");
    inputPass.focus();
    return "";
  }
  return true;
}

//Xóa input
function clearInput() {
  inputUName.value = "";
  inputPass.value = "";
}

//Sự kiện nút login
btnLogin.addEventListener("click", function (e) {
  const data = {
    userName: inputUName.value,
    password: inputPass.value,
  };
  if (validateDataLogin(data)) {
    currentUser = userArr[checkUName(data.userName)];
    currentUser.index = checkUName(data.userName);
    saveToStorage("CU", currentUser);
    console.log(currentUser);
    window.location.href = "../index.html";
  }
});
