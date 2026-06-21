import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { formatSize } from 'src/lib/formatSize';
import type { PickedFile, ThemedProps } from 'src/types';

type Props = {
    file: PickedFile;
    onClear: () => void;
    onChangeFile: () => void;
    onUpload: () => void;
};

const Card = styled.View`
    background-color: ${({ theme }: ThemedProps) => theme.colors.surface};
    border-radius: 20px;
    padding: 20px;
    gap: 20px;
`;

const FileRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 14px;
`;

const IconBadge = styled.View`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.background};
    align-items: center;
    justify-content: center;
`;

const FileInfo = styled.View`
    flex: 1;
    gap: 3px;
`;

const FileName = styled.Text`
    font-size: 15px;
    font-weight: 700;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const FileSize = styled.Text`
    font-size: 13px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: 12px;
`;

const ChangeButton = styled.TouchableOpacity`
    flex: 1;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.background};
    align-items: center;
    justify-content: center;
`;

const ChangeButtonText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const UploadButton = styled.TouchableOpacity`
    flex: 2;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    align-items: center;
    justify-content: center;
`;

const UploadButtonText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: #ffffff;
`;

export const FileConfirmCard = ({ file, onClear, onChangeFile, onUpload }: Props) => {
    const theme = useTheme();

    return (
        <Card>
            <FileRow>
                <IconBadge>
                    <Ionicons
                        name="document-text"
                        size={26}
                        color={theme.colors.primary}
                    />
                </IconBadge>

                <FileInfo>
                    <FileName numberOfLines={1}>
                        {file.name}
                    </FileName>

                    <FileSize>
                        {formatSize(file.size)}
                    </FileSize>
                </FileInfo>

                <TouchableOpacity
                    hitSlop={8}
                    onPress={onClear}
                >
                    <Ionicons
                        name="close"
                        size={20}
                        color={theme.colors.textMuted}
                    />
                </TouchableOpacity>
            </FileRow>

            <ButtonRow>
                <ChangeButton onPress={onChangeFile}>
                    <ChangeButtonText>
                        Change file
                    </ChangeButtonText>
                </ChangeButton>

                <UploadButton onPress={onUpload}>
                    <UploadButtonText>
                        Upload now
                    </UploadButtonText>
                </UploadButton>
            </ButtonRow>
        </Card>
    );
};
