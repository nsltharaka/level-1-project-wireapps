import ProductsList from "@/components/homeScreen/ProductsList";
import React from "react";
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Screen() {
    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <ProductsList/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
