import { StyleSheet } from "react-native";

const fontConstants = {
  sizeHeaderTitle: 34,
  sizeHeaderSubTitle: 18,
  sizeRegular: 16,
  sizeMedium: 20,
  sizeLarge: 24,
  weightBold: "bold",
  weightSemiBold: "semibold",
} as const;

const colorConstants = {
  black: "#000",
  white: "#fff",
  backgroundLight: "#fff",
  backgroundDark: "#000",
  backgroundRed: "red",
  backgroundDefaultIOS: "#f2f2f2",
  backgroundDimmed: "#00000080",
  textMain: "#000",
  textSub: "#767676",
} as const;

const sizeConstants = {
  borderRadiusDefault: 18,
  flexGapSmall: 5,
  flexGapDefault: 16,
  flexGapMedium: 10,
  flexGapLarge: 20,
  marginSmall: 5,
  marginMedium: 10,
  marginLarge: 20,
  paddingSmall: 10,
  paddingMedium: 14,
  paddingLarge: 20,
  paddingVerticalScreenHeader: 40,
  widthFullScreen: "100%",
  widthHairLine: StyleSheet.hairlineWidth,
} as const;

export { colorConstants, fontConstants, sizeConstants };
