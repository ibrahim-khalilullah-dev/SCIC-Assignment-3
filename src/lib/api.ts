export async function apiFetch(path: string, options: RequestInit = {}) {
  const cleanPath = path.startsWith("/api") ? path.substring(4) : path;
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  return fetch("/api/proxy" + cleanPath, {
    ...options,
    headers,
  });
}
