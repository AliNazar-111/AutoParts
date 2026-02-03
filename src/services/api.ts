const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api/v1';

const MAX_RETRIES = 3;
const INITIAL_BACKOFF = 500; // ms
const TIMEOUT = 10000; // 10 seconds

export async function fetchApi(endpoint: string, options: RequestInit = {}, retries = 0): Promise<any> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            signal: controller.signal,
            ...options,
        });

        clearTimeout(id);

        if (!response.ok) {
            // Only retry on 5xx errors or network failures
            if (response.status >= 500 && retries < MAX_RETRIES) {
                const delay = INITIAL_BACKOFF * Math.pow(2, retries);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchApi(endpoint, options, retries + 1);
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        if (response.status === 204) return null;
        return response.json();
    } catch (error: any) {
        clearTimeout(id);

        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }

        // Retry on network errors
        if (retries < MAX_RETRIES && error.message.includes('Failed to fetch')) {
            const delay = INITIAL_BACKOFF * Math.pow(2, retries);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchApi(endpoint, options, retries + 1);
        }

        throw error;
    }
}
