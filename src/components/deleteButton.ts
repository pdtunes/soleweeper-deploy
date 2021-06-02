import { apiURL } from "../data/api";
import { getToken } from "../utils/storage";

export default function deleteButton(id: any) {
  const container = document.querySelector(
    ".delete-container"
  ) as HTMLDivElement;

  container.innerHTML = `<button type="button" class="delete">Delete</button>`;

  const button = document.querySelector("button.delete") as HTMLButtonElement;

  button.onclick = async function () {
    const doDelete = confirm(
      "This action is permanent. Are you sure you want to delete this team? "
    );

    if (doDelete) {
      const url = apiURL + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "index.html";

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
