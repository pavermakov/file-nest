const BASE_URL = 'http://127.0.0.1:8000/api';

type RequestOptions = {
    method?: string;
    body?: BodyInit;
    headers?: Record<string, string>;
};

export const apiClient = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, {
        method: options.method ?? 'GET',
        headers: options.headers,
        body: options.body,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error ?? `Request failed with status ${response.status}`);
    }

    return response.json();
};
