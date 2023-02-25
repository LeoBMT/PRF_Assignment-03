"use strict";

//Lưu trữ dữ liệu trên máy
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Lấy dữ liệu Json
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

// Xóa dữ liệu
function removeItem(key) {
  localStorage.removeItem(key);
}

//Mảng User
const KEY = "USER_ARRAY"; //Key lưu trữ danh sách người dùng
const userArr = getFromStorage(KEY).map(function (mov) {
  return parseUser(mov);
});
//Mảng danh sách TO DO
const KEYTD = "TODO_ARRAY";
const todoArr = getFromStorage(KEYTD).map(function (mov) {
  return parseTodo(mov);
});
//Người dùng đang đăng nhập
let currentUser = getFromStorage("CU");

//Chuyển đổi kiểu dữ liệu của User
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}

//Chuyển đổi kiểu dữ liệu của Todo
function parseTodo(todo) {
  const td = new Todo(todo.task, todo.owner, todo.isDone);
  return td;
}

// Check UserName
function checkUName(userName) {
  return userArr.length > 0
    ? userArr.findIndex((x) => x.userName === userName)
    : -1;
}

// check pass
function checkPass(userName, pass) {
  const temp = userArr.findIndex((x) => x.userName === userName);
  return userArr[temp].password === pass ? true : false;
}
