import { Product } from "@/types/product";
import { router } from "expo-router";
import React from "react";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductsList({ products }: Props) {
  const onPressItem = (itemId: string) => router.push(`/product/${itemId}`);

  return (
    <>
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          item={product}
          onPressHandleFunc={onPressItem}
        />
      ))}
    </>
  );
}
