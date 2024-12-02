import { useThemeColor } from "@/hooks/useThemeColor";
import {
  colorConstants,
  fontConstants,
  sizeConstants,
} from "@/theme/styleConstants";
import { Ionicons } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
  iconProps?: {
    name: ComponentProps<typeof Ionicons>["name"];
    size: ComponentProps<typeof Ionicons>["size"];
  };
  textStyles?: StyleProp<TextStyle>;
};

export default function ActionButton({
  title,
  onPress,
  type = "primary",
  iconProps,
  style,
  textStyles,
}: Props) {
  const backgroundColor = useThemeColor(
    { light: colorConstants.black, dark: colorConstants.white },
    "background",
  );

  const textColor = useThemeColor(
    type === "secondary"
      ? { light: colorConstants.black, dark: colorConstants.white }
      : { light: colorConstants.white, dark: colorConstants.black },
    "text",
  );
  const borderColor = textColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { borderColor, backgroundColor },
        type === "secondary" && styles.secondary,
        style,
      ]}
    >
      <Text style={[styles.buttonTitle, { color: textColor }, textStyles]}>
        {title}
      </Text>
      {iconProps && (
        <Ionicons
          name={iconProps.name}
          size={iconProps.size}
          color={textColor}
          style={styles.buttonIcon}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: sizeConstants.paddingMedium,
    borderRadius: sizeConstants.borderRadiusDefault,
    borderWidth: 1,
  },
  buttonTitle: {
    fontWeight: fontConstants.weightBold,
    fontSize: fontConstants.sizeRegular,
  },
  secondary: {
    backgroundColor: undefined,
  },
  buttonIcon: {
    position: "absolute",
    left: 24,
  },
});
