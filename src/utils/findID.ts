export function findID(id: any, existingFavs: any) {
  const productExists = existingFavs.find((fav: any) => {
    return fav.id === id;
  });
  return productExists;
}
