import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:4000';

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let errorMessage = text;
    try {
      const errorData = JSON.parse(text);
      errorMessage = errorData.error?.message || errorData.message || text;
    } catch {
      // Use text as is if not JSON
    }
    throw new Error(errorMessage || `Request failed: ${res.status}`);
  }
  
  const result = await res.json();
  return result as T;
}
