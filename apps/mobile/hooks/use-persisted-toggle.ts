import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

type UsePersistedToggleParams<TMeta = void> = {
  /** Unique cache key */
  key: any;

  /** Check if entity is already persisted */
  check: () => Promise<boolean>;

  /** Persist entity */
  save: (meta?: TMeta) => Promise<void>;

  /** Remove persisted entity */
  remove: () => Promise<void>;

  /** Error messages */
  errors?: {
    save?: string;
    remove?: string;
    load?: string;
  };
};

export const usePersistedToggle = <TMeta = void>({
  key,
  check,
  save,
  remove,
  errors,
}: UsePersistedToggleParams<TMeta>) => {
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: key,
    queryFn: check,
  });

  const mutation = useMutation({
    mutationFn: async (isSaved: boolean) => {
      if (isSaved) {
        await remove();
        return false;
      }
      await save();
      return true;
    },
    onSuccess: (newValue) => {
      queryClient.setQueryData(key, newValue);
    },
    onError: (_, isSaved) => {
      Alert.alert(
        "Error",
        isSaved
          ? (errors?.remove ?? "Failed to remove item")
          : (errors?.save ?? "Failed to save item")
      );
    },
  });

  return {
    isSaved: statusQuery.data ?? false,
    isLoading: statusQuery.isLoading,
    isToggling: mutation.isPending,
    toggle: () => mutation.mutate(statusQuery.data ?? false),
  };
};
