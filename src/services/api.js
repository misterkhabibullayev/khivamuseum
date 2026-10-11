const BASE_URL = "https://api.atr.uz";

export async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Apida xato: ${res.status}`);
  }

  return await res.json();
}
