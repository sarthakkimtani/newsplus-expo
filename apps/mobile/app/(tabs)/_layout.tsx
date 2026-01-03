import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import { UnistylesRuntime } from "react-native-unistyles";

export default function TabLayout() {
  const theme = UnistylesRuntime.getTheme();

  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelVisibilityMode="labeled"
      indicatorColor="#00000021"
      backgroundColor={theme.colors.surface}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          selectedColor={theme.colors.primary}
          sf={{ default: "house", selected: "house.fill" }}
          androidSrc={<VectorIcon family={MaterialIcons} name="home" />}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stocks">
        <Label>Stocks</Label>
        <Icon
          selectedColor={theme.colors.primary}
          sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
          androidSrc={<VectorIcon family={MaterialIcons} name="trending-up" />}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="watchlist">
        <Label>Watchlist</Label>
        <Icon
          selectedColor={theme.colors.primary}
          sf={{ default: "chart.pie", selected: "chart.pie.fill" }}
          androidSrc={<VectorIcon family={MaterialIcons} name="library-books" />}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="members">
        <Label>Members</Label>
        <Icon
          selectedColor={theme.colors.primary}
          sf={{ default: "person", selected: "person.fill" }}
          androidSrc={<VectorIcon family={MaterialIcons} name="group" />}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
