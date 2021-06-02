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
const image_url = document.querySelector("#image") as HTMLInputElement;
const message = document.querySelector(
  ".message-container"
) as HTMLInputElement;

form.addEventListener("submit", submitForm);

function submitForm(event: Event) {
  event.preventDefault();

  message.innerHTML = "";

  const image_urlValue = image_url.value.trim();

  if (image_urlValue.length === 0) {
    return displayMessage("Invalid values", "Pleas fill in valid values");
  }
  addProducts(image_urlValue);
}

async function addProducts(image_url: string) {
  const imageUrl = apiURL + "home/";

  const data = JSON.stringify({
    image_url: image_url,
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
    const response = await fetch(imageUrl, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("Image is added", ".message-container");
    }

    if (json.error) {
    }
  } catch (error) {
    console.log(error);
  }
}
