import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import type { ThemedProps } from 'src/types';

const Container = styled.View`
    align-items: center;
    padding: 0 32px;
    gap: 12px;
`;

const Heading = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.heading}px;
    font-weight: 700;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
    text-align: center;
`;

const Subtext = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
    text-align: center;
    line-height: 22px;
`;

const UploadButton = styled.TouchableOpacity`
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    border-radius: 30px;
    padding: 14px 32px;
    align-self: stretch;
    align-items: center;
    margin-top: 8px;
`;

const ButtonLabel = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: #fff;
`;

export const EmptyState = () => {
    const router = useRouter();

    return (
        <Container>
            <Heading>
                Your nest is empty
            </Heading>

            <Subtext>
                Upload your first file and watch it land here.
            </Subtext>

            <UploadButton onPress={() => router.push('/add-file')}>
                <ButtonLabel>
                    Upload a file
                </ButtonLabel>
            </UploadButton>
        </Container>
    );
};
