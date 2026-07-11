// Falls back to the real production API so the site works out of the
// box even when NEXT_PUBLIC_API_URL isn't injected at build time
// (Next.js inlines NEXT_PUBLIC_* vars at build, not container start,
// which doesn't line up with how Dokploy passes runtime env vars).
// Override locally via .env.local to point at a local Django server.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.zardocard.com";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch(
  path,
  { method = "GET", body, token, isFormData, headers: extraHeaders, ...rest } = {}
) {
  const headers = { ...extraHeaders };
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    ...rest,
  });

  if (!res.ok) {
    let data = null;
    try {
      data = await res.json();
    } catch {
      // no JSON body
    }
    throw new ApiError(data?.detail || `Request failed (${res.status})`, res.status, data);
  }

  if (res.status === 204) return null;
  return res.json();
}
