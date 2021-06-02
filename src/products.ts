import renderHTML from "./utils/render";
import createMenu from "./components/createMenu";
import { apiURL } from "./data/api";
const productsUrl = apiURL + "products";

createMenu();

const search = document.getElementById("search");
let cachedData = [];

search.onkeyup = (e: any) => {
  filterData(e.target.value);
};

function filterData(value: any) {
  const regx = new RegExp(value, "gi");
  if (!value) {
    renderHTML(cachedData);
  } else {
    renderHTML(
      cachedData.filter(
        (product) => regx.test(product.title) || regx.test(product.brand)
      )
    );
    return regx;
  }
  renderHTML(cachedData);
}

async function fetchProducts() {
  const response = await fetch(productsUrl);
  const products = await response.json();

  cachedData = products;
  renderHTML(products);
}
fetchProducts();
