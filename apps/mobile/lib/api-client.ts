import type { Headline } from "@newsplus/schemas";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  const res = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const fetchArticles = async (): Promise<Headline> => {
  return apiFetch<Headline>("/news");
};
