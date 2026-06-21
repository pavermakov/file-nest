import { apiClient } from './client';
import type { PickedFile, StoredFile } from 'src/types';

type FilesResponse = {
    files: StoredFile[];
};

type CreateUploadResponse = {
    upload_url: string;
};

type UploadResponse = {
    file_id: string;
};

export const fetchFiles = async (): Promise<StoredFile[]> => {
    const data = await apiClient<FilesResponse>('/storage/files/');
    return data.files;
};

export const uploadFile = async (file: PickedFile): Promise<string> => {
    const { upload_url } = await apiClient<CreateUploadResponse>('/storage/uploads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bucket: 'avatars' }),
    });

    const formData = new FormData();
    formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.mimeType,
    } as unknown as Blob);

    const response = await fetch(upload_url, {
        method: 'PUT',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error ?? `Upload failed with status ${response.status}`);
    }

    const { file_id }: UploadResponse = await response.json();
    return file_id;
};
