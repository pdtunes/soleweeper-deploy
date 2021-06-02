import { getUsername } from "../utils/storage";
import logoutButton from "./logoutButton";

export default function createMenu() {
  const { pathname } = document.location;
  const container = document.querySelector(".navbar-nav") as HTMLDivElement;

  const username = getUsername();

  let authLink = `<a href="admin.html" class="${
    pathname === "./admin.html" ? "active" : ""
  }">Admin</a>`;

  if (username) {
    authLink = `<a href="add.html" class="${
      pathname === "/add.html" ? "active" : ""
    }">Add Product</a> 
    
    <a href="addhero.html" class="${
      pathname === "./addhero.html" ? "active" : ""
    }">Add Hero</a>
    <button id="logout">Logout ${username}</button>`;
  }

  container.innerHTML = `<div class="nav-item">
        <a href="./index.html" class="${
          pathname === "./index.html" || pathname === "./index.html"
            ? "active"
            : ""
        }">Home</a>
        <a href="./products.html" class="${
          pathname === "./products.html" || pathname === "./products.html"
            ? "active"
            : ""
        }">Products</a>
        <a href="./cart.html" class="${
          pathname === "./cart.html" || pathname === "./cart.html"
            ? "active"
            : ""
        }">Cart </a>
        <a href="./contact.html" class="${
          pathname === "./contact.html" || pathname === "./contact.html"
            ? "active"
            : ""
        }">Contact</a>
        ${authLink}
</div>`;

  logoutButton();
}
