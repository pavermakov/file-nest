import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { fetchFiles } from 'src/api/files';
import type { StoredFile } from 'src/types';

export const useFilesList = () => {
    const [files, setFiles] = useState<StoredFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasFetched = useRef(false);

    useFocusEffect(
        useCallback(() => {
            let cancelled = false;

            const load = async () => {
                if (!hasFetched.current) setLoading(true);
                setError(null);

                try {
                    const data = await fetchFiles();
                    if (!cancelled) setFiles(data);
                } catch (e) {
                    if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load files');
                } finally {
                    if (!cancelled) {
                        setLoading(false);
                        hasFetched.current = true;
                    }
                }
            };

            load();

            return () => { cancelled = true; };
        }, [])
    );

    return { files, loading, error };
};
