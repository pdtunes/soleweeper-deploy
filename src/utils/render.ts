import { getExistingFavs } from "./getExistingFavs";
import { getToken } from "./storage";
import { findID } from "./findID";

const token = getToken();

export default function renderHTML(content: any) {
  const container = document.querySelector(".card-group");
  const existingFavs = getExistingFavs();
  container.innerHTML = ``;
  if (content.length === 0) {
    container.innerHTML = `No data found`;
  } else {
    content.forEach((product: any) => {
      let cssClass = "fas";
      const doesProductExist = existingFavs.find((fav: any) => {
        return parseInt(fav.id) === product.id;
      });
      if (doesProductExist) {
        cssClass = "fa";
      }
      if (!token) {
        container.innerHTML += `
      <div class="card">
      <a class="product" href="detail.html?id=${product.id}">
      <img class="card-img-top img-fluid" src="${product.image_url}"alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${product.brand}</h5>
      <p class="card-text">${product.title} </p>
      <h6 class="card-title"> Price: $ ${product.price}</h6>
      </a>
      
      <i class="${cssClass}  fa-cart-plus"
      data-id="${product.id}"
      data-brand="${product.brand}"
      data-image="${product.image_url}"
      data-title="${product.title}"
      data-price="${product.price}" <h6>Add To Cart</h6>
      </i>
      
    </div>
  </div>
</div>
        `;
      } else {
        container.innerHTML += `<div class="card">
        <a class="product" href="edit.html?id=${product.id}">
        <img class="card-img-top img-fluid" src="${product.image_url}"alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${product.brand}</h5>
        <p class="card-text">${product.title} </p>
        <h6 class="card-title"> Price:$ ${product.price}</h6>
        </a>
        <i class="${cssClass}  fa-shopping-cart"
        data-id="${product.id}"
        data-brand="${product.brand}"
        data-image="${product.image_url}"
        data-title="${product.title}"
        data-price="${product.price}"  <h6>Add To Cart</h6>
        </i>
      </div>
    </div>
  </div>`;
      }
    });
  }

  const favButton = document.querySelectorAll(".card-body > i");

  favButton.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(e: any) {
    this.classList.toggle("fa");
    this.classList.toggle("fa-shopping-cart");
    const id = e.target.dataset.id;
    const brand = e.target.dataset.brand;
    const title = e.target.dataset.title;
    const price = e.target.dataset.price;
    const image = e.target.dataset.image;

    const existingFavs = getExistingFavs();

    const productExists = findID(id, existingFavs);

    if (productExists === undefined) {
      const product = {
        id: id,
        brand: brand,
        title: title,
        price: price,
        image: image,
      };

      existingFavs.push(product);
      saveToFavs(existingFavs);
    } else {
      const newFavs = existingFavs.filter((fav: any) => fav.id !== id);
      saveToFavs(newFavs);
    }
  }

  function saveToFavs(product: any) {
    localStorage.setItem("productsInCart", JSON.stringify(product));
  }
}
