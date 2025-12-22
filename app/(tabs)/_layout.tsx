import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      labelVisibilityMode="labeled"
      indicatorColor="#00000021"
      backgroundColor="#F9FAFB"
    >
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon
          selectedColor={"#000"}
          src={{
            default: <VectorIcon family={Ionicons} name="home-outline" />,
            selected: <VectorIcon family={Ionicons} name="home" />,
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stocks">
        <Label>Stocks</Label>
        <Icon
          selectedColor={"#000"}
          src={{
            default: <VectorIcon family={Ionicons} name="trending-up-outline" />,
            selected: <VectorIcon family={Ionicons} name="trending-up" />,
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="watchlist">
        <Label>Watchlist</Label>
        <Icon
          selectedColor={"#000"}
          src={{
            default: <VectorIcon family={Ionicons} name="eye-outline" />,
            selected: <VectorIcon family={Ionicons} name="eye" />,
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="members">
        <Label>Members</Label>
        <Icon
          selectedColor={"#000"}
          src={{
            default: <VectorIcon family={Ionicons} name="people-outline" />,
            selected: <VectorIcon family={Ionicons} name="people" />,
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
