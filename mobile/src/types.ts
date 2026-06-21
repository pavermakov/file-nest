import type { Theme } from 'src/theme';

export type ThemedProps = {
    theme: Theme
};

export type PickedFile = {
    uri: string;
    name: string;
    size: number;
    mimeType: string;
};

export type StoredFile = {
    id: string;
    original_name: string;
    content_type: string;
    size: number;
    status: string;
    created_at: string;
};
