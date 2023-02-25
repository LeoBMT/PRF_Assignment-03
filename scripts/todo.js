"use strict";

//Chọn phần tử
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const display = document.getElementById("todo-list");

// Kiểm tra đăng nhập
if (!currentUser.firstName) {
  alert("You must login before!");
  window.location.href = "../index.html";
} else {
  renderToDoList();
}

//trả về vị trí của Task
function checkTask(task) {
  return todoArr.findIndex(
    (e) => e.task === task && e.owner === currentUser.userName
  );
}

// Kiểm tra input
function validateToDo(data) {
  if (!data.task) {
    alert("Please input task!");
    inputTask.focus();
    return "";
  }
  if (checkTask(data.task) > 0) {
    alert("Task has already!");
    inputTask.focus();
    return "";
  }
  return true;
}

//Hiển thị danh sách task của user
function renderToDoList() {
  let userTask = todoArr.filter((x) => x.owner === currentUser.userName);
  display.innerHTML = "";
  let html = "";
  userTask.forEach((e) => {
    html += `<li ${e.isDone ? 'class="checked"' : ""} >${
      e.task
    }<span class="close">×</span></li>`;
  });
  display.innerHTML = html;
}

//Sự kiện btn Add
btnAdd.addEventListener("click", function (e) {
  const data = new Todo(inputTask.value, currentUser.userName, false);
  if (validateToDo(data)) {
    todoArr.push(data);
    saveToStorage(KEYTD, todoArr);
    renderToDoList();
    inputTask.value = "";
  }
});

// Sự kiện xóa task và hoàn thành task
display.addEventListener("click", function (e) {
  const clicked = e.target.closest(".close");
  let tempTask;
  //Xóa task
  if (clicked) {
    tempTask = clicked.closest("li").textContent.slice(0, -1);
    if (confirm("Are you sure?")) {
      todoArr.splice(checkTask(tempTask), 1);
      saveToStorage(KEYTD, todoArr);
      renderToDoList();
    }
  }
  //Hoàn thành task
  else {
    tempTask = e.target.textContent.slice(0, -1);
    todoArr[checkTask(tempTask)].isDone = todoArr[checkTask(tempTask)].isDone
      ? false
      : true;
    saveToStorage(KEYTD, todoArr);
    renderToDoList();
  }
});
