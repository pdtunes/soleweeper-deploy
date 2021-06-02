export function getExistingFavs() {
  const favs = localStorage.getItem("productsInCart");
  if (favs === null) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}
