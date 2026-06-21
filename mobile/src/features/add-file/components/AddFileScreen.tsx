import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useFiles } from 'src/context/FilesContext';
import { useFilePicker } from 'src/features/add-file/hooks/useFilePicker';
import { Dropzone } from './Dropzone';
import { FileConfirmCard } from './FileConfirmCard';
import { FileUploadedCard } from './FileUploadedCard';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 24px 20px;
`;

const Title = styled.Text`
    font-size: 30px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 6px;
`;

const Subtitle = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.body}px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 22px;
    margin-bottom: 28px;
`;

export const AddFileScreen = () => {
    const { file, pick, clear } = useFilePicker();
    const { addFile } = useFiles();
    const [uploaded, setUploaded] = useState(false);
    const router = useRouter();

    const heading = uploaded
        ? 'All done.'
        : file
            ? 'Ready to upload?'
            : 'Add a file';

    const subtitle = uploaded
        ? 'Your file is safely tucked into FileNest.'
        : file
            ? 'Review the file below, then tap upload to finish.'
            : "Pick an image to get started. We'll keep them organized.";

    const handleUpload = () => {
        if (file) {
            addFile(file);
        }
        setUploaded(true);
    };

    const handleUploadAnother = () => {
        clear();
        setUploaded(false);
    };

    const handleBackToHome = () => router.dismissAll();

    return (
        <Container edges={['bottom']}>
            <Title>
                {heading}
            </Title>

            <Subtitle>
                {subtitle}
            </Subtitle>

            {uploaded && file ? (
                <FileUploadedCard
                    fileName={file.name}
                    onUploadAnother={handleUploadAnother}
                    onViewFile={() => {}}
                    onBackToHome={handleBackToHome}
                />
            ) : file ? (
                <FileConfirmCard
                    file={file}
                    onClear={clear}
                    onChangeFile={pick}
                    onUpload={handleUpload}
                />
            ) : (
                <Dropzone onPress={pick} />
            )}
        </Container>
    );
};
