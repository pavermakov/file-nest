import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useFiles } from 'src/context/FilesContext';
import { formatSize } from 'src/lib/formatSize';
import { Header } from './Header';
import { EmptyState } from './EmptyState';
import { FilesList } from './FilesList';
import type { ThemedProps } from 'src/types';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }: ThemedProps) => theme.colors.background};
`;

const EmptyContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const ListContent = styled.View`
    flex: 1;
    margin-top: 20px;
`;

export const FilesListScreen = () => {
    const { files } = useFiles();
    const hasFiles = files.length > 0;

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const subtitle = hasFiles
        ? `${files.length} ${files.length === 1 ? 'file' : 'files'} · ${formatSize(totalSize)} used`
        : undefined;

    return (
        <Container>
            <Header subtitle={subtitle} />

            {hasFiles ? (
                <ListContent>
                    <FilesList />
                </ListContent>
            ) : (
                <EmptyContent>
                    <EmptyState />
                </EmptyContent>
            )}
        </Container>
    );
};
