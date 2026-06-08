import { authHeaders } from "./idp";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

export interface Device {
  id: string;
  name: string;
  protocol: string;
  status: string;
  createdAt: string;
}

export async function fetchDevices(): Promise<Device[]> {
  const res = await fetch(`${BASE}/devices`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<Device[]>;
}

export async function createDevice(body: {
  name: string;
  protocol: string;
}): Promise<Device> {
  const res = await fetch(`${BASE}/devices`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<Device>;
}

export async function healthCheck(): Promise<{ status: string }> {
  const res = await fetch(`${BASE}/health`);
  return res.json() as Promise<{ status: string }>;
}
