import data from "@/data/sample.json";
import type { Product } from "@/types/product";

const getAllProducts = (): Array<Product> => {
  return data;
};

const getProductById = (productId: string): Product | undefined => {
  return data.find((product) => product.id === productId);
};

export { getAllProducts, getProductById };
