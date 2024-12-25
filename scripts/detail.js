const detailImageEl = document.querySelector(".detail__image img");
const detailTitleEl = document.querySelector(".detail__product-title");
const detailPriceEl = document.querySelector(".detail__product-price");
const detailContentEl = document.querySelector(".detail__product-content");

const BASE_URL = "https://dummyjson.com";

async function fetchData() {
  let params = new URLSearchParams(window.location.search);
  const response = await fetch(`${BASE_URL}/products/${params.get("id")}`);
  const data = await response.json();
  createDetailPage(data);
}

window.onload = () => {
  fetchData();
};

function createDetailPage(data) {
  detailImageEl.src = data.images[0];
  detailTitleEl.textContent = data.title;
  detailPriceEl.textContent = `$${data.price}`;

  detailContentEl.innerHTML = `
        <p><span class="detail__info">Wax:</span> ${data.description}</p>
        <p><span class="detail__info">Fragrance:</span> ${data.brand}</p>
        <p><span class="detail__info">Burning Time:</span> ${data.burningTime}</p>
        <p><span class="detail__info">Dimension:</span> ${data.dimension}</p>
        <p><span class="detail__info">Weight:</span> ${data.weight}</p>
    `;
}
