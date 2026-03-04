const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

interface TokenCache {
    token: string;
    expiresAt: number;
}

let cache: TokenCache | null = null;
let inflight: Promise<string> | null = null;

export const getAccessToken = async (): Promise<string> => {
    const now = Date.now();
    if (cache && cache.expiresAt > now + 60_000) {
        return cache.token;
    }
    if (inflight) return inflight;

    inflight = (async () => {
        const res = await fetch(`${API_BASE_URL}/auth/token`);
        const data = await res.json();
        if (!data.success || !data.token) throw new Error("Failed to obtain access token");
        cache = { token: data.token, expiresAt: now + data.expiresIn * 1000 };
        return cache.token;
    })().finally(() => { inflight = null; });

    return inflight;
};
