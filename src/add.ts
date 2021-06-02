import displayMessage from "./components/displayMessage";
import createMenu from "./components/createMenu";
import { getToken } from "./utils/storage";
import { apiURL } from "./data/api";

const token = getToken();

if (!token) {
  location.href = "/";
}

createMenu();

const form = document.querySelector("form") as HTMLFormElement;
const brand = document.querySelector("#brand") as HTMLInputElement;
const title = document.querySelector("#title") as HTMLInputElement;
const description = document.querySelector("#description") as HTMLInputElement;
const price = document.querySelector("#price") as HTMLInputElement;
const image_url = document.querySelector("#image") as HTMLInputElement;
const message = document.querySelector(
  ".message-container"
) as HTMLInputElement;

form.addEventListener("submit", submitForm);

function submitForm(event: Event) {
  event.preventDefault();

  message.innerHTML = "";

  const brandValue = brand.value.trim();
  const titleValue = title.value.trim();
  const descriptionValue = description.value.trim();
  const priceValue = price.value.trim();
  const image_urlValue = image_url.value.trim();

  if (
    brandValue.length === 0 ||
    titleValue.length === 0 ||
    descriptionValue.length === 0 ||
    priceValue.length === 0 ||
    image_urlValue.length === 0
  ) {
    return displayMessage("Invalid values", "Please fill in valid values");
  }
  addProducts(
    brandValue,
    titleValue,
    descriptionValue,
    priceValue,
    image_urlValue
  );
}

async function addProducts(
  brand: string,
  title: string,
  description: string,
  price: string,
  image_url: string
) {
  const productsUrl = apiURL + "products/";

  const data = JSON.stringify({
    brand: brand,
    title: title,
    description: description,
    price: price,
    image_url: image_url,
  });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(productsUrl, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("Product is created", ".message-container");
    }

    if (Error) {
      displayMessage("error", ".message-container");
      console.log(Error);
    }
  } catch (error) {
    console.log(error);
  }
}
