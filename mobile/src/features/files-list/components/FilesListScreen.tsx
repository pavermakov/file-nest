import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useFilesList } from 'src/features/files-list/hooks/useFilesList';
import { formatSize } from 'src/lib/formatSize';
import { Header } from './Header';
import { EmptyState } from './EmptyState';
import { FilesList } from './FilesList';
import type { ThemedProps } from 'src/types';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }: ThemedProps) => theme.colors.background};
`;

const CenteredContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ListContent = styled.View`
    flex: 1;
    margin-top: 20px;
`;

export const FilesListScreen = () => {
    const { files, loading } = useFilesList();
    const hasFiles = files.length > 0;

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const subtitle = hasFiles
        ? `${files.length} ${files.length === 1 ? 'file' : 'files'} · ${formatSize(totalSize)} used`
        : undefined;

    if (loading) {
        return (
            <Container>
                <Header />

                <CenteredContent>
                    <ActivityIndicator size="large" />
                </CenteredContent>
            </Container>
        );
    }

    return (
        <Container>
            <Header subtitle={subtitle} />

            {hasFiles ? (
                <ListContent>
                    <FilesList />
                </ListContent>
            ) : (
                <CenteredContent>
                    <EmptyState />
                </CenteredContent>
            )}
        </Container>
    );
};
