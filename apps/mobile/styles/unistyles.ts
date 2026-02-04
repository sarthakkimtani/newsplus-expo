import { StyleSheet } from "react-native-unistyles";

import { lightTheme } from "./styles";

StyleSheet.configure({
  themes: {
    light: lightTheme,
  },
  settings: {
    initialTheme: "light",
  },
});

export type AppThemes = {
  light: typeof lightTheme;
};

declare module "react-native-unistyles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}
