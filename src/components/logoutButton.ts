import { ButtonHTMLAttributes } from "react";
import { clearStorage } from "../utils/storage";

export default function logoutButton() {
  const button = document.querySelector("#logout") as HTMLDivElement;

  if (button) {
    button.onclick = function () {
      const logout = confirm("Are you sure?");

      if (logout) {
        clearStorage();
        location.href = "/index.html";
      }
    };
  }
}
