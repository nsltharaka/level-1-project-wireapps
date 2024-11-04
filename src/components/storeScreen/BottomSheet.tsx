import { Ionicons } from "@expo/vector-icons";
import React, { type PropsWithChildren } from "react";
import { Modal, StyleSheet, View } from "react-native";

type Props = PropsWithChildren & {
  isVisible: boolean;
  onCloseButtonPress: () => void;
  height?: `${number}%`;
};

export default function BottomSheet({
  isVisible,
  height,
  children,
  onCloseButtonPress,
}: Props) {
  return (
    <Modal animationType={"slide"} visible={isVisible} transparent={true}>
      <View style={[styles.container, height && { height: height }]}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="close-outline"
            color={"grey"}
            size={28}
            onPress={onCloseButtonPress}
          />
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: "40%",
    width: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  content: {
    backgroundColor: "lightgreen",
    paddingHorizontal: 10,
  },
});
