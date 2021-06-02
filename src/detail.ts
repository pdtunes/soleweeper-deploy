import { getExistingFavs } from "./utils/getExistingFavs";
import { apiURL } from "./data/api";
import createMenu from "./components/createMenu";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

(async function () {
  createMenu();
  const productsUrl = apiURL + "products/" + id;
  const container = document.querySelector(".detail-container");
  const existingFavs = getExistingFavs();

  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    let cssClass = "far";
    const doesProductExist = existingFavs.find((fav) => {
      return parseInt(fav.id) === products.id;
    });
    if (doesProductExist) {
      cssClass = "fa";
    }
    {
      container.innerHTML += `
      <div class="detail-card">
      <div class="product" href="detail.html?id=${products.id}">
      <img class="card-img-top img-fluid" src="${products.image_url}"alt="Card image cap">
      <div class="card-body">
      <h4 class="card-title">${products.brand}</h4>
      <h5 class="card-title">${products.title}</h5>
      <p class="card-text">${products.description} </p>
      <h6 class="card-title"> Price: $ ${products.price}</h6>
     
      <i class="${cssClass} fa-heart "  
      data-id="${products.id}"
      data-brand="${products.brand}"
      data-title="${products.title}"
      data-image="${products.img}"
      data-description="${products.description}"
      data-price="${products.price}" <h6>Add To Cart</h6>
      </i>
      
    </div>
  </div>
</div>
        `;
    }
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
    this.classList.toggle("far");
    const id = e.target.dataset.id;
    const brand = e.target.dataset.brand;
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
        brand: brand,
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
