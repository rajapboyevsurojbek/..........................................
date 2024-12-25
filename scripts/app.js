const wrapperEl = document.querySelector(".product__content");
const searchInputEl = document.querySelector(".navbar__input");
const searchDropEl = document.querySelector(".search__drop");

const BASE_URL = "https://dummyjson.com";
const perPageCount = 8;
let productEndpoint = "/products";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const data = await response.json();
    createCard(data);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("load", () => {
  fetchData(`${productEndpoint}?limit=${perPageCount}`);
});

function createCard(data) {
  wrapperEl.innerHTML = "";
  data.products.forEach((product) => {
    const divEl = document.createElement("div");
    divEl.className = "product__card";
    divEl.innerHTML = `
            <img data-id=${product.id} src=${product.thumbnail} alt="rasm">
            <div class="product__content-text">
                <p class="product__title">${product.title}</p>
                <p class="product__price">${product.price} USD</p>
            </div>
        `;
    wrapperEl.appendChild(divEl);
  });
}

wrapperEl.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    open(`./detail.html?id=${e.target.dataset.id}`, "_self");
  }
});

searchInputEl.addEventListener("keyup", async (e) => {
  const value = e.target.value.trim();
  if (value) {
    searchDropEl.style.display = "block";
    try {
      const response = await fetch(
        `${BASE_URL}/products/search?q=${value}&limit=5`
      );
      const data = await response.json();
      searchDropEl.innerHTML = null;
      data.products.forEach((item) => {
        const divEl = document.createElement("div");
        divEl.className = "search__item";
        divEl.dataset.id = item.id;
        divEl.innerHTML = `
                    <img src=${item.thumbnail} alt="">
                    <div>
                         <p>${item.title}</p>
                    </div>
                `;
        searchDropEl.appendChild(divEl);
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    searchDropEl.style.display = "none";
  }
});

searchDropEl.addEventListener("click", (e) => {
  if (e.target.closest(".search__item")?.className === "search__item") {
    const id = e.target.closest(".search__item").dataset.id;
    open(`./detail.html?id=${id}`, "_self");
    searchInputEl.value = "";
    searchDropEl.style.display = "none";
  }
});
