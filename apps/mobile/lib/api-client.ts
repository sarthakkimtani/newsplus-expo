export async function apiFetch<T>(
  path: string,
  token: string | null,
  init?: RequestInit
): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  if (!token) throw new Error("Missing auth token");

  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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