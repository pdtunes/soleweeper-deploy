export function productFilter(products: any) {
  const converse = products.filter(function (shoe: any) {
    return shoe.brand === "Converse";
  });
  return converse;
}
