import { useClerk, useUser } from "@clerk/clerk-expo";
import * as Application from "expo-application";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { SettingsTile } from "@/components/ui/settings-tile";
import { clearArticles } from "@/lib/db/articles";

export const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;

  const handleSignout = async () => {
    try {
      setIsLoading(true);
      clearArticles();
      await signOut();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={styles.email}>{user?.emailAddresses?.[0]?.emailAddress}</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <SettingsTile
          title="About account"
          icon="person-outline"
          onPress={() => router.push("/settings/account")}
        />
        <SettingsTile
          title="Change password"
          icon="lock-closed-outline"
          onPress={() => router.push("/settings/password")}
        />
        <SettingsTile
          title="Delete account"
          icon="trash-outline"
          isDestructive
          onPress={() => router.push("/settings/delete")}
        />
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [styles.signoutBtn, pressed && styles.pressed]}
          disabled={isLoading}
          onPress={handleSignout}
        >
          {isLoading ? (
            <ActivityIndicator color={"#FFF"} />
          ) : (
            <Text style={styles.signoutText}>Sign Out</Text>
          )}
        </Pressable>
        <View style={styles.versionContainer}>
          <Text style={styles.version}>News+ Version {Application.nativeApplicationVersion}</Text>
          <Text style={styles.version}>Build {Application.nativeBuildVersion}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: theme.fonts.primary.bold,
  },
  userInfo: {
    flex: 1,
  },
  menuContainer: {
    marginBottom: theme.spacing.xl,
  },
  name: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: theme.fonts.primary.bold,
    marginBottom: 4,
  },
  email: {
    color: "#ffffffcc",
    fontSize: 14,
    fontFamily: theme.fonts.primary.regular,
  },
  footer: {
    alignItems: "center",
    gap: 40,
  },
  signoutBtn: {
    width: "50%",
    height: 50,
    borderRadius: theme.borderRadius.xl,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.danger,
  },
  signoutText: {
    color: "white",
    fontFamily: theme.fonts.primary.medium,
    fontSize: 16,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  versionContainer: {
    alignItems: "center",
    gap: 4,
  },
  version: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.primary.regular,
    fontSize: 13,
  },
}));
