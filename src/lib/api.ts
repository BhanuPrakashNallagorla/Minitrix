const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

let csrfToken: string | null = null;

async function ensureCsrf(): Promise<string> {
  if (csrfToken) return csrfToken;
  const res = await fetch(`${API_BASE}/api/csrf-token`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to get CSRF token');
  const data = await res.json();
  csrfToken = data.csrfToken;
  return csrfToken!;
}

export async function post<T = any>(path: string, payload: any): Promise<T> {
  await ensureCsrf();
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken!,
    },
    body: JSON.stringify(payload),
  });
  let data: any = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = data?.error || data?.message || 'Request failed';
    const err: any = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export async function getCsrfToken() {
  return ensureCsrf();
}
