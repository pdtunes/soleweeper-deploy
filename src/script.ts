import { getExistingFavs } from "./utils/getExistingFavs";
import { apiURL } from "./data/api";
import createMenu from "./components/createMenu";
import { getToken } from "./utils/storage";

const token = getToken();

(async function () {
  createMenu();
  const productsUrl = apiURL + "products";
  const imageUrl = apiURL + "home";
  const container = document.querySelector(".card-group");
  const hero = document.querySelector(".hero-image");

  const existingFavs = getExistingFavs();

  try {
    const response = await fetch(productsUrl);
    const products = await response.json();
    container.innerHTML = ``;

    const heroResponse = await fetch(imageUrl);
    const heroimage = await heroResponse.json();

    hero.innerHTML = `
    <img src="${heroimage.image_url}" alt="Hero image" />
    <div class="hero-text">
    <h1>Summer Collection 2021</h1>
   <a href="./products.html"><button id="clear">Shop Now</button> </a>
  </div>
    `;

    const featured = products.filter(function (shoe: any) {
      return shoe.featured === true;
    });
    featured.forEach((featuredshoe: any) => {
      let cssClass = "fas";
      const doesProductExist = existingFavs.find((fav: any) => {
        return parseInt(fav.id) === featuredshoe.id;
      });
      if (doesProductExist) {
        cssClass = "fa";
      }
      if (!token) {
        container.innerHTML += `
      <div class="card">
      <a class="product" href="detail.html?id=${featuredshoe.id}">
      <img class="card-img-top img-fluid" src="${featuredshoe.image_url}"alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${featuredshoe.brand}</h5>
      <p class="card-text">${featuredshoe.title} </p>
      <h6 class="card-title"> Price: $ ${featuredshoe.price}</h6>
      </a>
      <i class=" ${cssClass} fa-shopping-cart"  
      data-id="${featuredshoe.id}"
      data-brand="${featuredshoe.brand}"
      data-image="${featuredshoe.image_url}"
      data-title="${featuredshoe.title}"
      data-price="${featuredshoe.price}" <h6>Add To Cart</h6>
      </i>
    </div>
  </div>
</div>
        `;
      } else {
        container.innerHTML += `<div class="card">
        <a class="product" href="edit.html?id=${featuredshoe.id}">
        <img class="card-img-top img-fluid" src="${featuredshoe.image_url}"alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${featuredshoe.brand}</h5>
        <p class="card-text">${featuredshoe.title} </p>
        <h6 class="card-title"> Price:$ ${featuredshoe.price}</h6>
        </a>
        <i class="${cssClass} fa-cart-plus"
        data-id="${featuredshoe.id}"
        data-brand="${featuredshoe.brand}"
        data-image="${featuredshoe.image_url}"
        data-title="${featuredshoe.title}"
        data-price="${featuredshoe.price}" <h6>Add To Cart</h6>
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
    const brand = e.target.dataset.brand;
    const title = e.target.dataset.title;
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
