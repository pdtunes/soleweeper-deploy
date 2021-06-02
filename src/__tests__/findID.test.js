import { expect } from "@jest/globals";
import { findID } from "../utils/findID";

test("Find id", () => {
  expect(findID(10, existingFavMock)).toEqual({
    id: 10,
    name: "Air",
    brand: "Adidas",
  });
});

const existingFavMock = [
  {
    id: 10,
    name: "Air",
    brand: "Adidas",
  },
  {
    id: 11,
    name: "Ferrari",
    brand: "Puma",
  },
  {
    id: 12,
    name: "Grunge",
    brand: "Converse",
  },
];
