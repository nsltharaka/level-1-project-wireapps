const fontConstants = {
  sizeScreenHeaderTitle: 34,
  sizeScreenHeaderSubTitle: 18,
  sizeRegular: 16,
  weightBold: "bold",
  weightSemiBold: "semibold",
} as const;

const colorConstants = {
  backgroundDefault: "#fff",
  backgroundDefaultIOS: "#f2f2f2",
  textMain: "#000",
  textSub: "#767676",
} as const;

const sizeConstants = {
  flexGapDefault: 16,
  flexGapHorizontalLists: 10,
  paddingMedium: 20,
  paddingSmall: 16,
  paddingVerticalScreenHeader: 40,
  widthFullScreen: "100%",
} as const;

export { colorConstants, fontConstants, sizeConstants };
