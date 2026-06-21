import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

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
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Header = () => (
  <Row>
    <Badge>
      <Ionicons name="cloud" size={24} color="#fff" />
    </Badge>
    <Title>FileNest</Title>
  </Row>
);
