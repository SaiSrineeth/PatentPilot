const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    ...options,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  analyze: (payload: { smiles: string; target?: string; disease?: string }) =>
    request<{ success: boolean; analysis: any; data: any }>("/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  analyses: () => request<{ success: boolean; data: any[] }>('/analyses'),
};
