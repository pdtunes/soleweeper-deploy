import displayMessage from "./components/displayMessage";
import { apiURL } from "./data/api";
import { saveUser, saveToken } from "./utils/storage";
import createMenu from "./components/createMenu";

const form = document.querySelector("#register") as HTMLFormElement;
const username = document.querySelector("#username") as HTMLInputElement;
const password = document.querySelector("#password") as HTMLInputElement;
const email = document.querySelector("#email") as any;

createMenu();

form.addEventListener("submit", regForm);

function regForm(event: any) {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const emailValue = email.value.trim();

  if (
    usernameValue.length === 0 ||
    passwordValue.length === 0 ||
    email.length === 0
  ) {
    return displayMessage(
      "Incorrect username or password",
      ".message-container"
    );
  }

  register(usernameValue, passwordValue, emailValue);
}

async function register(username: string, password: string, email: string) {
  const url = apiURL + "auth/local/register/";
  const data = JSON.stringify({
    username: username,
    password: password,
    email: email,
  });

  console.log(data);

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

      displayMessage("You have registered successfully", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
