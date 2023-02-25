"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");

// Kiểm tra đăng nhập
if (!currentUser.firstName) {
  alert("You must login before!");
  window.location.href = "../index.html";
} else {
  displaySetting();
}

// Hiển thị setting cũ của user
function displaySetting() {
  inputPageSize.value = currentUser.pageSize;
  inputCategory.value = currentUser.category;
}

//Sự kiện btn Save
btnSave.addEventListener("click", function (e) {
  if (inputPageSize.value === "") {
    alert("Please input news per page!");
    inputPageSize.focus();
  } else {
    userArr[currentUser.index].pageSize = Number(inputPageSize.value);
    userArr[currentUser.index].category = inputCategory.value;
    currentUser.pageSize = inputPageSize.value;
    currentUser.category = inputCategory.value;
    saveToStorage(KEY, userArr);
    saveToStorage("CU", currentUser);
    alert("Save successfully!");
  }
});
