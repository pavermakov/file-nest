import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import type { ThemedProps } from 'src/types';

type Props = {
    subtitle?: string;
};

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 16px 20px 0;
    gap: 12px;
`;

const Badge = styled.View`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme }: ThemedProps) => theme.colors.primary};
    align-items: center;
    justify-content: center;
`;

const TitleGroup = styled.View`
    gap: 2px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const Subtitle = styled.Text`
    font-size: 13px;
    color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

export const Header = ({ subtitle }: Props) => (
    <Row>
        <Badge>
            <Ionicons
                name="cloud"
                size={24}
                color="#fff"
            />
        </Badge>

        <TitleGroup>
            <Title>
                FileNest
            </Title>

            {subtitle && (
                <Subtitle>
                    {subtitle}
                </Subtitle>
            )}
        </TitleGroup>
    </Row>
);
