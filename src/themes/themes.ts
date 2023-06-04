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
      background: "#3a3f42",
      border: "#9ba1a6",
      card: "#697177",
      notification: "#FF453A",
      primary: '#ffbf00',
      text: "#ecedee"
    }
  },
  {
    dark: false,
    image: require("../assets/images/light_theme.png"),
    index: 2,
    name: "light_theme",
    colors: {
      background: "#e3e3e3",
      border: "#ccccce",
      card: "#f4f4f4",
      notification: "#FF3B30",
      primary: "#058DE0",
      text: "#1C1C1E"
    }
  },
  {
    // Whether this is a dark theme or a light theme
    dark: true,
    index: 3,
    name: "sky_theme",
    colors: {
      // The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
      primary: COLORS.BLACK,
      // The color of various backgrounds, such as background color for the screens.
      background: COLORS.SKY,
      // The background color of card-like elements, such as headers, tab bars etc.
      card: COLORS.SKY_CARD,
      // The text color of various elements.
      text: COLORS.WHITE,
      // The color of borders, e.g. header border, tab bar border etc.
      border: '#90d9ff',
      // The color of Tab Navigator badge.
      notification: COLORS.SKY_NOTFICATION
    }
  },
  {
    dark: false,
    index: 4,
    name: "marine_theme",
    colors: {
      primary: '#ff249c',
      background: COLORS.MARINE,
      card: COLORS.MARINE_CARD,
      text: COLORS.BLACK,
      border: '#3a847e',
      notification: COLORS.MARINE_NOTFICATION
    }
  },
  {
    dark: true,
    index: 5,
    name: "orange_theme",
    colors: {
      primary: "#1fa5e6",
      background: COLORS.ORANGE,
      card: COLORS.ORANGE_CARD,
      text: COLORS.WHITE,
      border: COLORS.WHITE,
      notification: COLORS.ORANGE_NOTFICATION
    }
  },
  {
    dark: true,
    index: 6,
    name: "pink_theme",
    colors: {
      primary: "#00ffbf",
      background: COLORS.PINK,
      card: COLORS.PINK_CARD,
      text: COLORS.WHITE,
      border: '#ebb2e9',
      notification: COLORS.PINK_NOTFICATION
    }
  },
  {
    dark: true,
    index: 7,
    name: "purple_theme",
    colors: {
      primary: "#56f494",
      background: COLORS.PURPLE,
      card: COLORS.PURPLE_CARD,
      text: COLORS.WHITE,
      border: "#ebb2e9",
      notification: COLORS.PURPLE_NOTFICATION
    }
  },
  {
    dark: true,
    index: 8,
    name: "alert_theme",
    colors: {
      primary: "#00c8f0",
      background: COLORS.ALERT,
      card: COLORS.ALERT_CARD,
      text: COLORS.WHITE,
      border: "#f48399",
      notification: COLORS.ALERT_NOTFICATION
    }
  },
  {
    dark: true,
    index: 9,
    name: "olombine_theme",
    colors: {
      primary: "#bdb76b",
      background: COLORS.OLOMBINE,
      card: COLORS.OLOMBINE_CARD,
      text: COLORS.WHITE,
      border: "#7f8ca8",
      notification: COLORS.OLOMBINE_NOTFICATION
    }
  }
];
export { custom_themes };