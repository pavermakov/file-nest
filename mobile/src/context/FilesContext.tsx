import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PickedFile, StoredFile } from 'src/types';

type FilesContextType = {
    files: StoredFile[];
    addFile: (file: PickedFile) => void;
};

const FilesContext = createContext<FilesContextType | null>(null);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<StoredFile[]>([]);

    const addFile = (picked: PickedFile) => {
        const stored: StoredFile = {
            ...picked,
            id: Date.now().toString(),
            uploadedAt: new Date(),
        };

        setFiles((prev) => [stored, ...prev]);
    };

    return (
        <FilesContext.Provider value={{ files, addFile }}>
            {children}
        </FilesContext.Provider>
    );
};

export const useFiles = (): FilesContextType => {
    const context = useContext(FilesContext);

    if (!context) {
        throw new Error('useFiles must be used within a FilesProvider');
    }

    return context;
};
