import { Ionicons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";
import { withUnistyles } from "react-native-unistyles";

import { AppThemes } from "@/styles/unistyles";

type IconColor = keyof AppThemes["light"]["colors"];
type IconName = keyof typeof Ionicons.glyphMap;

export const UniIcons = ({
  name,
  color,
  size,
  style,
}: {
  name: IconName;
  color: IconColor;
  size?: number;
  style?: StyleProp<TextStyle>;
}) => {
  const UniIonicon = withUnistyles(Ionicons, (theme) => ({
    color: theme.colors[color],
  }));

  return <UniIonicon size={size} name={name} style={style} />;
};
