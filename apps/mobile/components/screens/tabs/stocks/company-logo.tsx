import { Image } from "expo-image";
import { StyleSheet } from "react-native-unistyles";

interface CompanyLogoProps {
  ticker: string;
  size?: "default" | "large";
}

export const CompanyLogo = ({ ticker, size = "default" }: CompanyLogoProps) => {
  const key = process.env.EXPO_PUBLIC_LOGO_PUBLISHABLE_KEY;
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Image
      cachePolicy="memory"
      placeholder={{ blurhash }}
      style={size === "large" ? styles.logoLarge : styles.logo}
      source={`https://img.logo.dev/ticker/${ticker}?token=${key}`}
    />
  );
};

const styles = StyleSheet.create(() => ({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoLarge: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
}));
