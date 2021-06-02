import { getExistingFavs } from "./utils/getExistingFavs";
import createMenu from "./components/createMenu";
import { getToken } from "./utils/storage";
createMenu();

const token = getToken();

function cartList() {
  const productsInCart = getExistingFavs();
  const container = document.querySelector(".card-group");
  const containerTot = document.querySelector(".total");

  const existingFavs = getExistingFavs();

  if (productsInCart.length === 0) {
    container.innerHTML = `<h2> You have no products in your cart. Go back and add some! </h2>`;
  }

  productsInCart.forEach((cart: any) => {
    let cssClass = "fa";
    const doesProductExist = existingFavs.find((fav: any) => {
      return parseInt(fav.id) === cart.id;
    });
    if (doesProductExist) {
      cssClass = "fa";
    }
    if (!token) {
      container.innerHTML += `
    <div class="card">
    <a class="product" href="detail.html?id=${cart.id}">
    <img class="card-img-top img-fluid" src="${cart.image}"alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${cart.brand}</h5>
    <p class="card-text">${cart.title} </p>
    <h6 class="card-title"> Price: $ ${cart.price}</h6>
    </a>
    <i class=" ${cssClass} fa-shopping-cart"  
    data-id="${cart.id}"
    data-brand="${cart.brand}"
    data-image="${cart.image}"
    data-title="${cart.title}"
    data-price="${cart.price}" <h6> Remove From Cart</h6>
    </i>
  </div>
</div>
</div>
      `;
    } else {
      container.innerHTML += `<div class="card">
      <a class="product" href="edit.html?id=${cart.id}">
      <img class="card-img-top img-fluid" src="${cart.image}"alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">${cart.brand}</h5>
      <p class="card-text">${cart.title} </p>
      <h6 class="card-title"> Price:$ ${cart.price}</h6>
      </a>
      <i class="${cssClass} fa-cart-plus"
      data-id="${cart.id}"
      data-brand="${cart.brand}"
      data-image="${cart.image}"
      data-title="${cart.title}"
      data-price="${cart.price}"<h6> Add to cart</h6>
      </i>
    </div>
  </div>
</div>`;
    }
  });

  let totalprice = 0;

  productsInCart.forEach((cart: any) => {
    containerTot.innerHTML = `
  <div class="card">
    <h4 class="card-title"> Total:$ ${(totalprice =
      totalprice + parseFloat(cart.price))}</h4>
  </div>
</div>
</div>  `;
  });
  const favButton = document.querySelectorAll(".card-body > i");

  favButton.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick(e: any) {
    this.classList.toggle("fa");
    this.classList.toggle("fa-cart-plus");
    const id = e.target.dataset.id;
    const title = e.target.dataset.title;
    const brand = e.target.dataset.brand;
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
        brand: brand,
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

function clearButton() {
  const clearBtn = document.querySelector("#clear");

  clearBtn.addEventListener("click", clearList);

  function clearList() {
    if (confirm("Are you sure you want to clear the list?")) {
      localStorage.removeItem("productsInCart");
      cartList();
    }
  }
}

cartList();
clearButton();
