import { COLORS } from "../constants/styles_sheet";

export interface Themes {
  dark: boolean,
  image?: any,
  index: number,
  name?: string,
  colors: { [key: string]: string }
}


const custom_themes: Array<Themes> = [
  {
    dark: true,
    image: require("../assets/images/dark_theme.png"),
    index: 1,
    name: "dark_theme",
    colors: {
      background: "#010101",
      border: "#FAFAFA",
      card: "#262626",
      notification: "#FF453A",
      primary: COLORS.PRIMARY,
      text: "#E5E5E7"
    }
  },
  {
    dark: false,
    image: require("../assets/images/light_theme.png"),
    index: 2,
    name: "light_theme",
    colors: {
      background: "#F2F2F2",
      border: "#D8D8D8",
      card: "#FFFFFF",
      notification: "#FF3B30",
      primary: COLORS.PRIMARY,
      text: "#1C1C1E"
    }
  },
  {
    // Whether this is a dark theme or a light theme
    dark: false,
    index: 3,
    name: "sky_theme",
    colors: {
      // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
      primary: COLORS.PRIMARY,
      // The color of various backgrounds, such as background color for the screens.
      background: COLORS.SKY,
      // The background color of card-like elements, such as headers, tab bars etc.
      card: COLORS.SKY_CARD,
      // The text color of various elements.
      text: COLORS.BLACK,
      // The color of borders, e.g. header border, tab bar border etc.
      border: COLORS.BLACK,
      // The color of Tab Navigator badge.
      notification: COLORS.SKY_NOTFICATION
    }
  },
  {
    dark: false,
    index: 4,
    name: "marine_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.MARINE,
      card: COLORS.MARINE_CARD,
      text: COLORS.BLACK,
      border: COLORS.BLACK,
      notification: COLORS.MARINE_NOTFICATION
    }
  },
  {
    dark: false,
    index: 5,
    name: "orange_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.ORANGE,
      card: COLORS.ORANGE_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.ORANGE_NOTFICATION
    }
  },
  {
    dark: false,
    index: 6,
    name: "purple_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.PURPLE,
      card: COLORS.PURPLE_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.PURPLE_NOTFICATION
    }
  },
  {
    dark: true,
    index: 7,
    name: "pink_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.PINK,
      card: COLORS.PINK_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.PINK_NOTFICATION
    }
  },
  {
    dark: true,
    index: 8,
    name: "alert_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.ALERT,
      card: COLORS.ALERT_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.ALERT_NOTFICATION
    }
  },
  {
    dark: true,
    index: 9,
    name: "olombine_theme",
    colors: {
      primary: COLORS.PRIMARY,
      background: COLORS.OLOMBINE,
      card: COLORS.OLOMBINE_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.OLOMBINE_NOTFICATION
    }
  }
];
export { custom_themes };