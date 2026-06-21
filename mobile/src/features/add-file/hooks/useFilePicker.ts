import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import type { PickedFile } from 'src/types';

export const useFilePicker = () => {
    const [file, setFile] = useState<PickedFile | null>(null);

    const pick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            quality: 1,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        const name = asset.fileName ?? asset.uri.split('/').pop() ?? 'image';
        const size = asset.fileSize ?? 0;
        const mimeType = asset.mimeType ?? 'image/jpeg';

        setFile({ name, size, mimeType });
    };

    const clear = () => setFile(null);

    return { file, pick, clear };
};
