import { expect } from "@jest/globals";
import { productFilter } from "../utils/productFilter";

const adidas = {
  brand: "Adidas",
};
const puma = {
  brand: "Puma",
};
const converse = {
  brand: "Converse",
};

const products = [adidas, puma, converse];

test("Product filter", () => {
  expect(productFilter(products)).toEqual([converse]);
});
