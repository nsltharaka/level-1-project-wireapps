import CartItemCard from "@/components/cart/CartItemCard";
import useCartContext from "@/hooks/useCartContext";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Cart() {
    const [cart] = useCartContext();

    const FooterComponent = () => (
        <View style={styles.cartDescription}>
            <Text style={styles.totalAmount}>Total : $ {cart.totalAmount}</Text>
        </View>
    )

    return (
        <FlatList
            data={cart.cartItems}
            contentContainerStyle={styles.ContentContainer}
            renderItem={({ item }) => <CartItemCard item={item} />}
            ListFooterComponent={FooterComponent}
        />

    );
}

const styles = StyleSheet.create({
    ContentContainer: {
        gap: 10,
        padding: 10
    },
    cartDescription: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    totalAmount: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "flex-end"
    }
});