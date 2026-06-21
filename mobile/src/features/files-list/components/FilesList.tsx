import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useFilesList } from 'src/features/files-list/hooks/useFilesList';
import { FileRow } from './FileRow';
import type { ThemedProps, StoredFile } from 'src/types';

const SectionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 12px;
`;

const SectionTitle = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
    font-weight: 600;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const ItemCount = styled.Text`
    font-size: 13px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

const StyledList = styled(FlatList<StoredFile>).attrs({
    contentContainerStyle: {
        paddingHorizontal: 20,
        gap: 10,
    },
})``;

const UploadButton = styled.TouchableOpacity`
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    border-radius: 30px;
    padding: 14px 28px;
    align-self: center;
    margin: 20px 0;
`;

const UploadButtonText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: #fff;
`;

const renderItem = ({ item }: { item: StoredFile }) => (
    <FileRow file={item} />
);

const keyExtractor = (item: StoredFile) => item.id;

export const FilesList = () => {
    const { files } = useFilesList();
    const router = useRouter();

    return (
        <>
            <SectionHeader>
                <SectionTitle>
                    All files
                </SectionTitle>

                <ItemCount>
                    {files.length} {files.length === 1 ? 'item' : 'items'}
                </ItemCount>
            </SectionHeader>

            <StyledList
                data={files}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListFooterComponent={
                    <UploadButton onPress={() => router.push('/add-file')}>
                        <UploadButtonText>
                            + Upload file
                        </UploadButtonText>
                    </UploadButton>
                }
            />
        </>
    );
};
