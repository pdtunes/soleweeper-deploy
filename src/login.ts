import displayMessage from "./components/displayMessage";
import { apiURL } from "./data/api";
import { saveUser, saveToken } from "./utils/storage";
import createMenu from "./components/createMenu";

const form = document.querySelector("#login") as HTMLFormElement;
const username = document.querySelector("#username") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;

createMenu();

form.addEventListener("submit", loginForm);

function loginForm(event: any) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage(
      "Incorrect username or password",
      ".message-container"
    );
  }

  login(usernameValue, passwordValue);
}

async function login(username: string, password: string) {
  const url = apiURL + "auth/local/";
  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-type": " application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "index.html";
    }
  } catch (error) {
    console.log(error);
  }
}
