import useShopContext from "@/hooks/useShopContext";
import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import ProductCard from "./ProductCard";
import {Product} from "@/types/product";

export default function ProductsList() {
    const {products} = useShopContext();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {products.map((product: Product) => (
                <ProductCard key={product.id} item={product}/>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
});
