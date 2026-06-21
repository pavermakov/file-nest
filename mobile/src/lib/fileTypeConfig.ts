type FileTypeConfig = {
    icon: string;
    color: string;
};

const MIME_CONFIGS: Record<string, FileTypeConfig> = {
    'image': { icon: 'image', color: '#F4845F' },
    'video': { icon: 'videocam', color: '#E85D5D' },
    'application/pdf': { icon: 'document-text', color: '#4A9EE8' },
};

const DEFAULT_CONFIG: FileTypeConfig = {
    icon: 'document',
    color: '#6B7280',
};

export const getFileTypeConfig = (mimeType: string): FileTypeConfig =>
    MIME_CONFIGS[mimeType] ??
    MIME_CONFIGS[mimeType.split('/')[0]] ??
    DEFAULT_CONFIG;
