"use strict";
//Chọn phần tử
const container = document.getElementById("news-container");
const next = document.getElementById("btn-next");
const previous = document.getElementById("btn-prev");
const currentPageNum = document.getElementById("page-num");
const inputKeyWord = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");

// Khai báo biến global
let totalResults = 0;
let pageNum = Number(currentPageNum.textContent);
let keyWord = "";

// Lấy dữ liệu từ API
const getNews = async function (country, keyWord, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${keyWord}&country=${country}&pageSize=${pageSize}&page=${page}&apiKey=394d6daf271d42df86e1d7e8b7a856ed`
    );
    const data = await res.json();
    totalResults = data.totalResults;
    renderNews(data);
  } catch (err) {
    alert("An error occurred!");
  }
};

// Kiểm tra đăng nhập
if (!currentUser.firstName) {
  alert("You must login before!");
  window.location.href = "../index.html";
} else checkPage();

// Hiển thị bài viết
function renderNews(data) {
  checkPage();
  container.innerHTML = "";
  let html = `There are ${totalResults} results found`;
  //Kiểm tra API có trả về bài viết nào không
  if (totalResults === 0) {
    html = `<h1 class='text-center'>There are ${totalResults} results found</h1>`;
    currentPageNum.style.display = "none";
  } else {
    currentPageNum.style.display = "block";
    data.articles.forEach(function (data) {
      html += `
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${
              data.urlToImage ? data.urlToImage : '"" alt="Image Not Available"'
            }" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${
                data.title ? data.title : "Data Not Available"
              }</h5>
              <p class="card-text">${
                data.description ? data.description : "Data Not Available"
              }</p>
              <a href="${
                data.url ? data.url : "Data Not Available"
              }" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>`;
    });
  }
  container.innerHTML = html;
}

//Sự kiện btn Search
btnSearch.addEventListener("click", function (e) {
  if (inputKeyWord.value === "") {
    alert("Please input keyword!");
  } else {
    keyWord = inputKeyWord.value;
    getNews("us", keyWord, currentUser.pageSize, 1);
    pageNum = currentPageNum.textContent = 1;
  }
});

//Kiểm tra trang đầu và trang cuối
function checkPage() {
  previous.style.display = pageNum === 1 ? "none" : "block";
  next.style.display =
    totalResults / currentUser.pageSize <= pageNum ? "none" : "block";
  currentPageNum.style.display = totalResults === 0 ? "none" : "block";
}

//Hàm chuyển trang
function changePage(e) {
  getNews(
    "us",
    keyWord,
    currentUser.pageSize,
    e === "next" ? ++pageNum : --pageNum
  );
  currentPageNum.textContent = pageNum;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

//Sự kiện btn next
next.addEventListener("click", function (e) {
  changePage("next");
});

// Sự kiện btn prev
previous.addEventListener("click", function (e) {
  changePage("");
});
