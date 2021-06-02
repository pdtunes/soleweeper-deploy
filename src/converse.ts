import { getExistingFavs } from "./utils/getExistingFavs";
import { apiURL } from "./data/api";
import createMenu from "./components/createMenu";
import { getToken } from "./utils/storage";
import { productFilter } from "./utils/productFilter";

const token = getToken();

(async function () {
  createMenu();
  const productsUrl = apiURL + "products";
  const container = document.querySelector(".card-group");
  const existingFavs = getExistingFavs();

  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    container.innerHTML = ``;

    const converse = productFilter(products);

    converse.forEach((converseshoe: any) => {
      let cssClass = "fas";
      const doesProductExist = existingFavs.find((fav: any) => {
        return parseInt(fav.id) === converseshoe.id;
      });
      if (doesProductExist) {
        cssClass = "fa";
      }
      if (!token) {
        container.innerHTML += `
      <div class="card">
      <a class="product" href="detail.html?id=${converseshoe.id}">
      <img class="card-img-top img-fluid" src="${converseshoe.image_url}"alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${converseshoe.title}</h5>
      <p class="card-text">${converseshoe.description} </p>
      <h6 class="card-title"> Price: $ ${converseshoe.price}</h6>
      </a>
      <i class="${cssClass} fa-shopping-cart "  
      data-id="${converseshoe.id}"
      data-title="${converseshoe.title}"
      data-image="${converseshoe.img}"
      data-description="${converseshoe.description}"
      data-price="${converseshoe.price}" <h6>Add To Cart</h6>
      </i>
      
    </div>
  </div>
</div>
        `;
      } else {
        container.innerHTML += `<div class="card">
        <a class="product" href="edit.html?id=${converseshoe.id}">
        <img class="card-img-top img-fluid" src="${converseshoe.image_url}"alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${converseshoe.title}</h5>
        <p class="card-text">${converseshoe.description} </p>
        <h6 class="card-title"> Price:$ ${converseshoe.price}</h6>
        </a>
        <i class="${cssClass} fa-cart-plus "
        data-id="${converseshoe.id}"
        data-title="${converseshoe.title}"
        data-image="${converseshoe.image_url}"
        data-description="${converseshoe.description}"
        data-price="${converseshoe.price}" <h6>Add To Cart</h6>
        </i>
      </div>
    </div>
  </div>`;
      }
    });
  } catch (error) {
    error = "error";
    console.log(error);
  }

  const favButton = document.querySelectorAll(".card-body > i");

  favButton.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(e: any) {
    this.classList.toggle("fa");
    this.classList.toggle("fa-shopping-cart");
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    const description = e.target.dataset.description;
    const price = e.target.dataset.price;
    const image = e.target.dataset.image;

    const existingFavs = getExistingFavs();

    const productExists = existingFavs.find((fav: any) => {
      return fav.id === id;
    });

    if (productExists === undefined) {
      const product = {
        id: id,
        title: title,
        description: description,
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
})();
