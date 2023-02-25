"use strict";
//API Key
// d6b08ba61298417d945f324605086bd3
// 5d3f9ea1e369453fafeeecf67627f560
// 394d6daf271d42df86e1d7e8b7a856ed

//Chọn phần tử
const container = document.getElementById("news-container");
const next = document.getElementById("btn-next");
const previous = document.getElementById("btn-prev");
const currentPageNum = document.getElementById("page-num");

// Khai báo biến global
let totalResults = 0;
let pageNum = Number(currentPageNum.textContent);

// Lấy dữ liệu từ API
const getNews = async function (country, category, pageSize, page) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=394d6daf271d42df86e1d7e8b7a856ed`
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
} else {
  getNews("us", currentUser.category, currentUser.pageSize, pageNum);
}

// Hiển thị bài viết
function renderNews(data) {
  checkPage();
  container.innerHTML = "";
  let html = "";
  //Kiểm tra API có trả về bài viết nào không
  if (totalResults === 0) {
    html = `<h1 class='text-center'>Nothing to display</h1>`;
    currentPageNum.style.display = "none";
  } else {
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

//Kiểm tra trang đầu và trang cuối
function checkPage() {
  previous.style.display = pageNum === 1 ? "none" : "block";
  next.style.display =
    totalResults / currentUser.pageSize <= +pageNum ? "none" : "block";
  if (totalResults === 0) currentPageNum.style.display = "none";
  else currentPageNum.style.display = "block";
}

//Sự kiện btn next
next.addEventListener("click", function (e) {
  getNews("us", currentUser.category, currentUser.pageSize, ++pageNum);
  currentPageNum.textContent = pageNum;
});

// Sự kiện btn prev
previous.addEventListener("click", function (e) {
  getNews("us", currentUser.category, currentUser.pageSize, --pageNum);
  currentPageNum.textContent = pageNum;
});
