import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import type { ThemedProps } from 'src/types';

type Props = {
    fileName: string;
    onUploadAnother: () => void;
    onViewFile: () => void;
    onBackToHome: () => void;
};

const Card = styled.View`
    background-color: ${({ theme }: ThemedProps) => theme.colors.surface};
    border-radius: 20px;
    padding: 32px 20px 24px;
    align-items: center;
    gap: 12px;
`;

const IconBadge = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
`;

const StatusTitle = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const StatusMessage = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
    text-align: center;
    margin-bottom: 8px;
`;

const ButtonRow = styled.View`
    flex-direction: row;
    gap: 12px;
    align-self: stretch;
`;

const SecondaryButton = styled.TouchableOpacity`
    flex: 1;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.background};
    align-items: center;
    justify-content: center;
`;

const SecondaryButtonText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const PrimaryButton = styled.TouchableOpacity`
    flex: 1;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    align-items: center;
    justify-content: center;
`;

const PrimaryButtonText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.button}px;
    font-weight: 600;
    color: #ffffff;
`;

const BackToHomeLink = styled.TouchableOpacity`
    margin-top: 4px;
`;

const BackToHomeLinkText = styled.Text`
    font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

export const FileUploadedCard = ({ fileName, onUploadAnother, onViewFile, onBackToHome }: Props) => (
    <Card>
        <IconBadge>
            <Ionicons
                name="checkmark"
                size={36}
                color="#ffffff"
            />
        </IconBadge>
        
        <StatusTitle>
            File added
        </StatusTitle>

        <StatusMessage>
            "{fileName}" is now in your FileNest.
        </StatusMessage>

        <ButtonRow>
            <SecondaryButton onPress={onUploadAnother}>
                <SecondaryButtonText>
                    Upload another
                </SecondaryButtonText>
            </SecondaryButton>

            <PrimaryButton onPress={onViewFile}>
                <PrimaryButtonText>
                    View file
                </PrimaryButtonText>
            </PrimaryButton>
        </ButtonRow>

        <BackToHomeLink onPress={onBackToHome}>
            <BackToHomeLinkText>
                Back to home
            </BackToHomeLinkText>
        </BackToHomeLink>
    </Card>
);
