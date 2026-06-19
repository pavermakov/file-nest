import { Ionicons } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1.5px;
  border-style: dashed;
  border-color: #d1d5db;
  border-radius: 20px;
  padding: 48px 24px;
  align-items: center;
  gap: 12px;
`;

const IconBadge = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Hint = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body}px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Dropzone = () => {
  const theme = useTheme();

  return (
    <Card>
      <IconBadge>
        <Ionicons name="cloud-upload-outline" size={34} color={theme.colors.primary} />
      </IconBadge>
      <Label>Tap to choose a file</Label>
      <Hint>Up to 100MB · any format</Hint>
    </Card>
  );
};
