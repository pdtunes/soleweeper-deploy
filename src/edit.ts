import { apiURL } from "./data/api";
import displayMessage from "./components/displayMessage";
import createMenu from "./components/createMenu";
import { getToken } from "./utils/storage";
import deleteButton from "./components/deleteButton";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productsUrl = apiURL + "products/" + id;

const form = document.querySelector("form") as HTMLFormElement;
const title = document.querySelector("#title") as HTMLInputElement;
const brand = document.querySelector("#brand") as HTMLInputElement;
const image = document.querySelector("#image") as HTMLInputElement;
const description = document.querySelector("#description") as HTMLInputElement;
const price = document.querySelector("#price") as HTMLInputElement;
// const idEl = document.querySelector("#id");
const featured = document.querySelector("#featured") as HTMLInputElement;
const message = document.querySelector(
  ".message-container"
) as HTMLInputElement;

(async function () {
  try {
    const response = await fetch(productsUrl);
    const productDetails = await response.json();

    title.value = productDetails.title;
    brand.value = productDetails.brand;
    image.value = productDetails.image_url;
    description.value = productDetails.description;
    price.value = productDetails.price;

    featured.checked = productDetails.featured;
    deleteButton(productDetails.id);
  } catch (error) {
    console.log(error);
  } finally {
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event: any) {
  event.preventDefault();

  message.innerHTML = "";

  const updatedProduct = {
    title: title.value.trim(),
    brand: brand.value.trim(),
    image_url: image.value.trim(),
    description: description.value.trim(),
    price: price.value.trim(),
    featured: featured.checked,
  };
  if (
    updatedProduct.title.length === 0 ||
    updatedProduct.description.length === 0 ||
    updatedProduct.price.length === 0
  ) {
    return displayMessage("Invalid values", "Please fill in valid values");
  }
  updateProduct(updatedProduct);
}

async function updateProduct({
  title,
  brand,
  image_url,
  description,
  price,
  featured,
}) {
  const productsUrl = apiURL + "products/" + id;

  const data = JSON.stringify({
    title: title,
    brand: brand,
    image_url: image_url,
    description: description,
    price: price,
    featured: featured,
  });

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productsUrl, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("Product is updated", ".message-container");
    }

    if (json.error) {
      displayMessage(json.message, ".message-container");
    }
  } catch (error) {
    displayMessage(error.message, ".message-container");
    console.log(error);
  }
}
