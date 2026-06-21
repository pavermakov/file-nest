import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { getFileTypeConfig } from 'src/lib/fileTypeConfig';
import { formatSize } from 'src/lib/formatSize';
import { formatTimeAgo } from 'src/lib/formatTimeAgo';
import type { ThemedProps, StoredFile } from 'src/types';

type Props = {
    file: StoredFile;
};

const Card = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }: ThemedProps) => theme.colors.surface};
    border-radius: 16px;
    padding: 14px 16px;
    gap: 14px;
`;

const IconCircle = styled.View<{ bgColor: string }>`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background-color: ${({ bgColor }) => bgColor}20;
    align-items: center;
    justify-content: center;
`;

const Info = styled.View`
    flex: 1;
    gap: 2px;
`;

const NameRow = styled.View`
    flex-direction: row;
    align-items: baseline;
    gap: 6px;
`;

const FileName = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
    font-weight: 600;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const Extension = styled.Text`
    font-size: 12px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

const Meta = styled.Text`
    font-size: 13px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

const getExtension = (fileName: string): string => {
    const dot = fileName.lastIndexOf('.');
    return dot !== -1 ? fileName.slice(dot) : '';
};

const getBaseName = (fileName: string): string => {
    const dot = fileName.lastIndexOf('.');
    return dot !== -1 ? fileName.slice(0, dot) : fileName;
};

export const FileRow = ({ file }: Props) => {
    const config = getFileTypeConfig(file.content_type);

    return (
        <Card>
            <IconCircle bgColor={config.color}>
                <Ionicons
                    name={config.icon as keyof typeof Ionicons.glyphMap}
                    size={22}
                    color={config.color}
                />
            </IconCircle>

            <Info>
                <NameRow>
                    <FileName numberOfLines={1}>
                        {getBaseName(file.original_name)}
                    </FileName>

                    <Extension>
                        {getExtension(file.original_name)}
                    </Extension>
                </NameRow>

                <Meta>
                    {formatSize(file.size)} · {formatTimeAgo(new Date(file.created_at))}
                </Meta>
            </Info>
        </Card>
    );
};
